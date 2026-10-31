using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Forms;

[assembly: AssemblyTitle("Aro-KRD-Airplay")]
[assembly: AssemblyDescription("Aro-KRD-Airplay - Low Latency AirPlay Screen Receiver for Windows")]
[assembly: AssemblyCompany("arokrd")]
[assembly: AssemblyProduct("Aro-KRD-Airplay")]
[assembly: AssemblyCopyright("Copyright (c) 2026 arokrd")]
[assembly: AssemblyVersion("1.0.0.0")]
[assembly: AssemblyFileVersion("1.0.0.0")]

namespace AirPlayLauncher
{
    static class Program
    {
        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern bool AttachConsole(int dwProcessId);

        [DllImport("user32.dll")]
        private static extern bool SetProcessDPIAware();

        private const int ATTACH_PARENT_PROCESS = -1;

        [STAThread]
        static int Main(string[] args)
        {
            try
            {
                SetProcessDPIAware();
            }
            catch { }

            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string scriptPath = Path.Combine(baseDir, "airplay-ui.ps1");

            if (!File.Exists(scriptPath))
            {
                MessageBox.Show(
                    "Could not find airplay-ui.ps1 in:\n" + baseDir,
                    "Aro-KRD-Airplay",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                return 1;
            }

            bool isSelfTest = false;
            string forwardedArgs = string.Empty;

            if (args != null && args.Length > 0)
            {
                for (int i = 0; i < args.Length; i++)
                {
                    if (string.Equals(args[i], "-SelfTest", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(args[i], "--SelfTest", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(args[i], "/SelfTest", StringComparison.OrdinalIgnoreCase))
                    {
                        isSelfTest = true;
                    }
                }
                forwardedArgs = " " + string.Join(" ", args);
            }

            if (isSelfTest)
            {
                AttachConsole(ATTACH_PARENT_PROCESS);

                var psi = new ProcessStartInfo
                {
                    FileName = "powershell.exe",
                    Arguments = "-NoProfile -ExecutionPolicy Bypass -Command \"& '" + scriptPath.Replace("'", "''") + "'" + forwardedArgs + "; exit $LASTEXITCODE\"",
                    UseShellExecute = false,
                    CreateNoWindow = false
                };

                try
                {
                    using (var p = Process.Start(psi))
                    {
                        if (p != null)
                        {
                            p.WaitForExit();
                            return p.ExitCode;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Failed to execute airplay-ui.ps1: " + ex.Message);
                    return 1;
                }
                return 0;
            }

            // Normal GUI Launch: zero console window flashes
            string psCommand =
                "$ErrorActionPreference='Continue'; " +
                "try { " +
                "  Add-Type -AssemblyName PresentationFramework; " +
                "  & $env:PCAIRPLAY_UI" + forwardedArgs + "; " +
                "  if ($LASTEXITCODE) { throw ('airplay-ui.ps1 exited with code ' + $LASTEXITCODE + '.') } " +
                "} catch { " +
                "  $m = 'aro-krd-airplay failed to start.' + [Environment]::NewLine + [Environment]::NewLine + $_.Exception.Message; " +
                "  try { Set-Content -LiteralPath ($env:TEMP + '\\pcairplay-crash.log') -Value ($m + [Environment]::NewLine + $_.ScriptStackTrace) } catch { }; " +
                "  try { [void][System.Windows.MessageBox]::Show($m, 'Aro-KRD-Airplay', 'OK', 'Error') } catch { }; " +
                "  exit 1 " +
                "}";

            var startInfo = new ProcessStartInfo
            {
                FileName = "powershell.exe",
                Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command \"" + psCommand + "\"",
                UseShellExecute = false,
                CreateNoWindow = true,
                WindowStyle = ProcessWindowStyle.Hidden,
                WorkingDirectory = baseDir
            };
            startInfo.EnvironmentVariables["PCAIRPLAY_UI"] = scriptPath;

            try
            {
                Process.Start(startInfo);
                return 0;
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Failed to launch PowerShell host:\n\n" + ex.Message,
                    "Aro-KRD-Airplay",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                return 1;
            }
        }
    }
}

