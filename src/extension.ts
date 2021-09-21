import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { DeviceSettingPanel } from "./DeviceSettingPanel";
import { DevicesData } from "./Models/devicesData";
import * as fs from 'fs';
import { Device } from "./Models/deviceData";
import { createCpp, createHeader } from './Repository/classCreator';

var model = new DevicesData();

export function activate(context: vscode.ExtensionContext) {

  if (context.globalState.get<vscode.Uri>("arduinoLibrariesPath") === undefined) {
    vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
  }

  if (context.globalState.get<boolean>("isDeviceSettingPanelOpen") === true) {
    vscode.commands.executeCommand("LTC.openDevicesPanel");
  }

  if (context.globalState.get<boolean>("isNewFile") === true) {

    if (vscode.workspace.workspaceFolders?.length === undefined ? 0 : vscode.workspace.workspaceFolders.length > 1) {
      vscode.window.showInformationMessage("Több folder van megnyitva");
    }
    else {
      vscode.window.showInformationMessage("Csak egy folder van megnyitva");
    }

    const newFileName = context.globalState.get<string>("newFileName")?.valueOf();

    context.globalState.update("isNewFile", false);

    const initString =
      `
void setup(){
  pinMode(13,OUTPUT);
}
void loop(){
  digitalWrite(13,HIGH);
  delay(500);
  digitalWrite(13,LOW);
  delay(500);
}`;



    const filePath = vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', newFileName + '.ino');

    const wsedit = new vscode.WorkspaceEdit();
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.set(filePath, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(10, 0)), initString)]);

    vscode.workspace.applyEdit(wsedit).then(() => {
      vscode.workspace.openTextDocument(filePath).then(() => {
        vscode.commands.executeCommand('arduino.initialize').then(() => {
          vscode.commands.executeCommand('arduino.selectSerialPort');
        });
      });
    });
  }

  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  item.text = "$(tools) Devices";
  item.command = "LTC.openDevicesPanel";
  item.show();

  //context.globalState.update("DevicesModel",model);
  if (typeof context.globalState.get<DevicesData>("DevicesModel") !== typeof undefined) {
    model = context.globalState.get<DevicesData>("DevicesModel")!;
  }

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("LTC-sidebar", sidebarProvider),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.addMessage", async () => {
      vscode.window.showInformationMessage('sikerult!');

      let doc = await vscode.workspace.openTextDocument("D:/letöltések/Tesztelunk/korte.ino");

      await vscode.window.showTextDocument(doc, { preview: false });

      const wsedit = new vscode.WorkspaceEdit();
      const filePath = vscode.Uri.parse("D:/letöltések/Tesztelunk/korte.ino");

      wsedit.createFile(filePath, { ignoreIfExists: true });
      wsedit.set(filePath, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(2, 0)), "asldmsada")]);
      vscode.workspace.applyEdit(wsedit);

      let docc = await vscode.workspace.openTextDocument(
        filePath); // calls back into the provider

      await vscode.window.showTextDocument(docc, { preview: false });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openLTCProject", async () => {
      vscode.window.showInformationMessage("openLTCProject");
      const options: vscode.OpenDialogOptions = {
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        openLabel: 'Open',
        filters: {
          'text files': ['txt'],
          'all files': ['*']
        },
        defaultUri: vscode.Uri.joinPath(context.extensionUri, 'ltcLib')
      };

      vscode.window.showOpenDialog(options).then(fileUri => {
        if (fileUri && fileUri[0]) {
          vscode.window.showInformationMessage('Selected file: ' + fileUri[0].fsPath);
          vscode.workspace.updateWorkspaceFolders(0,
            undefined,
            { uri: fileUri[0] });
        }

      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.newLTCProject", async () => {
      vscode.window.showInformationMessage("newLTCProject");

      const res = await vscode.window.showInputBox({ prompt: "What should be the name of the new project?" });
      if (res !== undefined) {
        const filePath = vscode.Uri.joinPath(context.extensionUri, 'ltcLib', res + 'Project');

        if (!fs.existsSync(filePath.fsPath)) {
          vscode.workspace.updateWorkspaceFolders(0,
            undefined,
            { uri: filePath, name: res + 'Project' });

          await context.globalState.update("newFileName", res);
          await context.globalState.update("isNewFile", true);
          // await vscode.commands.executeCommand('vscode.openFolder',
          // vscode.Uri.joinPath(context.extensionUri, 'ltcLib', res + 'Project'),false);
          await vscode.commands.executeCommand('workbench.action.reloadWindow');
        }
        else {
          vscode.window.showErrorMessage("File is already exist!");
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.addArduinoLibrariesPath", async () => {
      const answer = await vscode.window.showOpenDialog(
        {
          canSelectFolders: true,
          canSelectFiles: false,
          canSelectMany: false,
          openLabel: "Select",
          title: "Select your arduino libraries folder!\n(Default: C:\\Users\\YOUR_USER\\Documents\\Arduino\\libraries)"
        });

      if (answer === undefined) {
        if (context.globalState.get<vscode.Uri>("arduinoLibrariesPath") === undefined) {
          vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
          vscode.window.showErrorMessage("You have to select your arduino libraries folder!");
        }
      }
      else {
        var tmp = answer.pop();
        if (tmp !== undefined) {
          //TODO: Delete libraries and add them to the new 
          //TODO: Delete vscode folder and run arduino init
          const wsedit = new vscode.WorkspaceEdit();
          if (vscode.workspace.workspaceFolders?.find(x => x.name === ".vscode")?.uri !== undefined) {
            wsedit.deleteFile(vscode.workspace.workspaceFolders?.find(x => x.name === ".vscode")?.uri!);
          }
          
          context.globalState.update("arduinoLibrariesPath", tmp);
          vscode.window.showInformationMessage("We saved your arduino libraries path, you can change it anytime.");
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.reInit", async () => {

      const newFileName = context.globalState.get<string>("newFileName")?.valueOf();
      const filePath = vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', newFileName + '.ino');

      if (fs.existsSync(vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', '.vscode').fsPath)) {
        var rimraf = require("rimraf");
        rimraf.sync(vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', '.vscode').fsPath);
      }


      setTimeout(() => {
        vscode.commands.executeCommand('arduino.initialize').then(() => {
          vscode.commands.executeCommand('arduino.selectSerialPort');
        });
      }, 1000);
    })
  );


  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openDevicesPanel", () => {
      DeviceSettingPanel.currentPanel?.dispose();
      DeviceSettingPanel.createOrShow(context.extensionUri, model);

      DeviceSettingPanel.currentPanel?._panel.onDidDispose(x => context.globalState.update("isDeviceSettingPanelOpen", DeviceSettingPanel.currentPanel?._panel.visible));

      //Handle messages from device setting panel
      DeviceSettingPanel.currentPanel?._panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case 'save':
              context.globalState.update("DevicesModel", model);
              break;
            case "init-view":
              context.globalState.update("isDeviceSettingPanelOpen", true);
              break;
            case "dispose":
              vscode.window.showInformationMessage("dispose");
              context.globalState.update("isDeviceSettingPanelOpen", false);
              break;
            case "createClass":
              var tmp = new Device();
              Object.assign(tmp, JSON.parse(message.value));;

              while (context.globalState.get<vscode.Uri>("arduinoLibrariesPath") === undefined) {
                vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
              }
              var path = context.globalState.get<vscode.Uri>("arduinoLibrariesPath")!;

              vscode.window.showInformationMessage(path.path);

              path = vscode.Uri.file(path.path);

              const filePathHeader = vscode.Uri.joinPath(path, tmp.descriptionTabData.name, tmp.descriptionTabData.name + '.h');
              const filePathCpp = vscode.Uri.joinPath(path, tmp.descriptionTabData.name, tmp.descriptionTabData.name + '.cpp');

              const wsedit = new vscode.WorkspaceEdit();

              wsedit.createFile(filePathHeader, { ignoreIfExists: true });
              wsedit.set(filePathHeader, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), createHeader(tmp))]);

              wsedit.createFile(filePathCpp, { ignoreIfExists: true });
              wsedit.set(filePathCpp, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), createCpp(tmp))]);

              vscode.workspace.applyEdit(wsedit);
          }
        }
      );
    }
    ));




  //If there is already an opened panel it will show just that
  if (vscode.window.registerWebviewPanelSerializer) {

    // Make sure we register a serializer in activation event
    vscode.window.registerWebviewPanelSerializer(DeviceSettingPanel.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
        console.log(`Got state: ${state}`);
        // Reset the webview options so we use latest uri for `localResourceRoots`.
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
        DeviceSettingPanel.revive(webviewPanel, context.extensionUri);
      }
    });
  }



}



function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
  return {
    // Enable javascript in the webview
    enableScripts: true,

    localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media'), vscode.Uri.joinPath(extensionUri, 'ltcLib')]
  };
}

// this method is called when your extension is deactivated
export function deactivate() {
}
