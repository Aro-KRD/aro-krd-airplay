; aro-krd-airplay net-installer (Inno Setup 6 / 7).
;
; Deliberately installs ONLY the MIT-licensed scripts and launcher in this repo.
; The UxPlay engine (GPL-3.0) is downloaded directly by the installer with a
; native progress bar and SHA-256 integrity verification, then silently installed.
;
; Built by .github/workflows/release.yml:
;     ISCC.exe /DMyAppVersion=<x.y.z> installer\pcairplay.iss
; Output lands in installer\Output\ (gitignored).

#ifndef MyAppVersion
  #define MyAppVersion "1.0.0"
#endif
#define MyAppName "AirBridge"
#define MyAppURL  "https://github.com/arokrd/AirBridge"

[Setup]
; Fixed AppId so upgrades install over the top instead of side-by-side.
AppId={{6C87048D-4B16-49FF-93CC-75340B727AB2}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher=arokrd
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/issues
AppUpdatesURL={#MyAppURL}/releases
DefaultDirName={autopf}\AirBridge
DefaultGroupName=AirBridge
DisableProgramGroupPage=yes
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=admin
MinVersion=10.0
LicenseFile=..\LICENSE
OutputBaseFilename=AirBridge-setup-{#MyAppVersion}
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayName={#MyAppName}
SetupIconFile=..\pcairplay.ico
UninstallDisplayIcon={app}\pcairplay.ico
WizardImageFile=wizard-image-100.bmp,wizard-image-200.bmp
WizardSmallImageFile=wizard-small-100.bmp,wizard-small-200.bmp

[Files]
Source: "..\AirBridge.exe";      DestDir: "{app}"; Flags: ignoreversion
Source: "..\uxplay-common.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\setup.ps1";         DestDir: "{app}"; Flags: ignoreversion
Source: "..\start-airplay.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\airplay-ui.ps1";    DestDir: "{app}"; Flags: ignoreversion
Source: "..\frame-mirror.ps1";  DestDir: "{app}"; Flags: ignoreversion
Source: "..\doctor.ps1";        DestDir: "{app}"; Flags: ignoreversion
Source: "..\aro-krd-airplay.vbs";    DestDir: "{app}"; Flags: ignoreversion
Source: "..\aro-krd-airplay.cmd";    DestDir: "{app}"; Flags: ignoreversion
Source: "..\Diagnostics.cmd";   DestDir: "{app}"; Flags: ignoreversion
Source: "..\Framed Mirror.cmd"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\README.md";         DestDir: "{app}"; Flags: ignoreversion
Source: "..\LICENSE";           DestDir: "{app}"; Flags: ignoreversion
Source: "..\pcairplay.ico";     DestDir: "{app}"; Flags: ignoreversion

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Icons]
Name: "{group}\AirBridge";              Filename: "{app}\AirBridge.exe"; WorkingDir: "{app}"; IconFilename: "{app}\pcairplay.ico"; AppUserModelID: "arokrd.pcairplay"
Name: "{group}\AirBridge Diagnostics";  Filename: "{app}\Diagnostics.cmd"; WorkingDir: "{app}"; IconFilename: "{app}\pcairplay.ico"
Name: "{group}\Uninstall AirBridge";    Filename: "{uninstallexe}"
Name: "{autodesktop}\AirBridge";        Filename: "{app}\AirBridge.exe"; WorkingDir: "{app}"; IconFilename: "{app}\pcairplay.ico"; AppUserModelID: "arokrd.pcairplay"; Tasks: desktopicon

[Code]
var
  DownloadPage: TDownloadWizardPage;
  UxPlayNeeded: Boolean;

function IsUxPlayInstalled: Boolean;
var
  TestPath: string;
begin
  Result := False;
  // Check known install locations for UxPlay 1.x CLI engine
  TestPath := ExpandConstant('{commonpf32}\uxplay-windows\_internal\bin\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;

  TestPath := ExpandConstant('{commonpf64}\uxplay-windows\_internal\bin\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;

  TestPath := ExpandConstant('{autopf}\uxplay-windows\_internal\bin\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;

  TestPath := ExpandConstant('{commonpf32}\uxplay-windows\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;

  TestPath := ExpandConstant('{commonpf64}\uxplay-windows\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;

  TestPath := ExpandConstant('{autopf}\uxplay-windows\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;

  TestPath := ExpandConstant('{localappdata}\Programs\uxplay-windows\_internal\bin\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;

  TestPath := ExpandConstant('{localappdata}\Programs\uxplay-windows\uxplay.exe');
  if FileExists(TestPath) then begin Result := True; Exit; end;
end;

procedure InitializeWizard;
begin
  // Built-in Inno Setup download page with real-time download progress bar
  DownloadPage := CreateDownloadPage(
    SetupMessage(msgWizardPreparing),
    'Downloading UxPlay AirPlay engine...',
    nil
  );
end;

function NextButtonClick(CurPageID: Integer): Boolean;
begin
  Result := True;
  if CurPageID = wpReady then
  begin
    UxPlayNeeded := not IsUxPlayInstalled;
    if UxPlayNeeded then
    begin
      DownloadPage.Clear;
      DownloadPage.Add(
        'https://github.com/leapbtw/uxplay-windows/releases/download/v1.72.1-3/uxplay-windows-installer-v1.72.1-3.exe',
        'uxplay-setup.exe',
        'cb45de36d960b27d60dfe16a2a45489bd287d4335d37967f109d8cc4b5372986'
      );
      DownloadPage.Show;
      try
        try
          DownloadPage.Download;
        except
          if DownloadPage.AbortedByUser then
          begin
            Log('UxPlay download was aborted by user.');
            Result := False;
            Exit;
          end
          else
          begin
            SuppressibleMsgBox(
              'Failed to download the UxPlay engine: ' + GetExceptionMessage + #13#10#13#10 +
              'Setup will continue, but AirBridge requires UxPlay to receive AirPlay connections.',
              mbError, MB_OK, IDOK
            );
          end;
        end;
      finally
        DownloadPage.Hide;
      end;
    end;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  UxInstaller: string;
  ResultCode: Integer;
begin
  if CurStep = ssPostInstall then
  begin
    UxInstaller := ExpandConstant('{tmp}\uxplay-setup.exe');
    if FileExists(UxInstaller) then
    begin
      WizardForm.StatusLabel.Caption := 'Installing UxPlay engine...';
      // Execute UxPlay installer silently in the background
      Exec(UxInstaller, '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
      // Suppress any competing window that might have been spawned
      Exec('taskkill.exe', '/F /IM uxplay-windows.exe', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
      DeleteFile(UxInstaller);
    end;
  end;
end;

[Run]
; Configure firewall rules silently in the background with zero visible console window.
; -SkipInstall ensures setup.ps1 does not attempt to download UxPlay again or open a terminal.
; -SkipBonjourCheck ensures installation completes smoothly even if Bonjour is not yet present.
Filename: "powershell.exe"; Parameters: "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File ""{app}\setup.ps1"" -SkipInstall -SkipBonjourCheck"; Flags: runhidden waituntilterminated

; Launch AirBridge directly from the finish page without any console window
Filename: "{app}\AirBridge.exe"; Description: "{cm:LaunchProgram,AirBridge}"; Flags: nowait postinstall skipifsilent

[UninstallRun]
; Removes the firewall rules setup.ps1 created. UxPlay and Bonjour keep their
; own Apps & Features entries.
Filename: "powershell.exe"; Parameters: "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File ""{app}\setup.ps1"" -Uninstall"; Flags: runhidden waituntilterminated; RunOnceId: "RemovePCAirPlayFirewallRules"
