import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { DeviceSettingPanel } from "./DeviceSettingPanel";
import { DevicesData } from "./Models/devicesData";
import * as fs from 'fs';
import { Device } from "./Models/deviceData";
import { createCpp, createHeader } from './Repository/classCreator';
import { DevicesDataHandler } from "./Repository/devicesDataHandler";
import { Console } from "console";

var model = new DevicesData();

export function activate(context: vscode.ExtensionContext) {

  vscode.commands.executeCommand("workbench.action.closeEditorInAllGroups");

  if (!context.globalState.get<vscode.Uri>("arduinoLibrariesPath")) {
    vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
  }


  if (!context.globalState.get<vscode.Uri>("arduinoProjectsPath")) {
    vscode.commands.executeCommand("LTC.addArduinoProjectsPath");
  }

  vscode.window.onDidChangeActiveTextEditor(x => {
    if (x && x.document.fileName.endsWith(".ino")) {

      var projectPath = context.globalState.get<vscode.Uri>("arduinoProjectsPath");

      if (projectPath) {
        var path = vscode.Uri.joinPath(vscode.Uri.file(projectPath.path), '.vscode', 'arduino.json');
        if (fs.existsSync(path.fsPath)) {
          try {
            var data = fs.readFileSync(path.fsPath, 'utf8');
            let text = JSON.parse(data.toString());
            let name = x.document.fileName.substring(x.document.fileName.lastIndexOf("\\") + 1, x.document.fileName.length - 4);
            text.sketch = name + '\\' + name + ".ino";
            text.output = "out";
            text.board = "arduino:avr:uno";

            fs.writeFile(path.fsPath, JSON.stringify(text), function (err) {
              if (err) {
                return console.log('Error in writing to the new ino file: ', err);
              }
              console.log('Updated arduino.json');
            });
          } catch (e) {
            console.log('Error in updating arduino.json:', e);
          }

        }
        else {
          vscode.commands.executeCommand("arduino.initialize");
        }
      }
    }
  });


  //context.globalState.update("DevicesModel",model);
  if (context.globalState.get<DevicesData>("DevicesModel")) {
    model = context.globalState.get<DevicesData>("DevicesModel")!;

    //Save to json
    // let data = JSON.stringify(model.devices);
    // const filePath = vscode.Uri.joinPath(context.extensionUri, 'src', 'Data', 'baseDevices.json');

    // fs.truncate(filePath.fsPath, 0, function(){console.log('done');});

    // fs.writeFile(filePath.fsPath, data, function (err) {
    //   if (err){
    //     return console.log(err);
    //   } 
    //   console.log('Write model to json');
    // });

  }
  else {
    //First initialization
    //Get base devices from json
    const filePath = vscode.Uri.joinPath(context.extensionUri, 'src', 'Data', 'baseDevices.json');
    let rawdata = fs.readFileSync(filePath.fsPath);
    model.devices = JSON.parse(rawdata.toString());
  }

  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  item.text = "$(tools) Devices";
  item.command = "LTC.openDevicesPanel";
  item.show();

  const sidebarProvider = new SidebarProvider(context.extensionUri, model);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("LTC-sidebar", sidebarProvider),

  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.newLTCProject", async () => {
      vscode.window.showInformationMessage("new LTCProject");

      const res = await vscode.window.showInputBox({ prompt: "What should be the name of the new project?" });
      if (res) {
        var projectPath = context.globalState.get<vscode.Uri>("arduinoProjectsPath");
        projectPath = vscode.Uri.file(projectPath?.path!);

        if (projectPath) {
          var filePath = vscode.Uri.joinPath(vscode.Uri.file(projectPath.path), res, res + '.ino');
          if (!fs.existsSync(filePath.fsPath)) {
            let initString = `#include <Arduino.h>
#include <LTCfiles.h>

LedController led;

void setup(){

}

void loop(){

}`;
            const wsedit = new vscode.WorkspaceEdit();
            wsedit.createFile(filePath, { ignoreIfExists: true });
            wsedit.set(filePath, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), initString)]);
            vscode.workspace.applyEdit(wsedit);

            //Open projects folder
            if (!vscode.workspace.getWorkspaceFolder(projectPath)) {
              vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: projectPath!, name: "Projects" });
            }
            var projectPath = context.globalState.get<vscode.Uri>("arduinoProjectsPath");

            if (projectPath) {
              var path = vscode.Uri.joinPath(vscode.Uri.file(projectPath.path), '.vscode', 'arduino.json');
              if (fs.existsSync(path.fsPath)) {
                try {
                  var data = fs.readFileSync(path.fsPath, 'utf8');
                  let text = JSON.parse(data.toString());
                  text.sketch = res + '\\' + res + ".ino";
                  text.output = "out";
                  text.board = "arduino:avr:uno";

                  fs.writeFile(path.fsPath, JSON.stringify(text), function (err) {
                    if (err) {
                      return console.log('Error in writing to the new ino file: ', err);
                    }
                    console.log('Updated arduino.json');
                  });
                } catch (e) {
                  console.log('Error in updating arduino.json:', e);
                }

              }
              else {
                vscode.commands.executeCommand("arduino.initialize");
              }
            }
          }
          else {
            vscode.window.showErrorMessage("File is already exist!");
          }

        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openLTCProjects", async () => {
      var projectPath = context.globalState.get<vscode.Uri>("arduinoProjectsPath");
      projectPath = vscode.Uri.file(projectPath?.path!);

      if (projectPath) {
        //Open projects folder
        if (!vscode.workspace.getWorkspaceFolder(projectPath)) {
          vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: projectPath!, name: "Projects" });
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
          title: "Select your arduino libraries folder!\n(Default: C:\\Users\\USERNAME\\Documents\\Arduino\\libraries)"
        });

      if (!answer) {
        if (!context.globalState.get<vscode.Uri>("arduinoLibrariesPath")) {
          vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
          vscode.window.showErrorMessage("You have to select your arduino libraries folder!");
        }
      }
      else {
        var tmp = answer.pop();
        if (tmp) {
          context.globalState.update("arduinoLibrariesPath", tmp);

          vscode.window.showInformationMessage("We saved your arduino libraries path, you can change it anytime.");

          const fse = require('fs-extra');
          const srcDir = vscode.Uri.joinPath(context.extensionUri, 'src', 'Data', 'BaseDevices').fsPath;
          const destDir = context.globalState.get<vscode.Uri>("arduinoLibrariesPath")?.fsPath;

          // To copy a folder or file  
          fse.copySync(srcDir, destDir, { overwrite: true }, function (err: any) {
            if (err) {
              console.error(err);
            } else {
              console.log("success to copy base devices!");
            }
          });
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.addArduinoProjectsPath", async () => {
      const answer = await vscode.window.showOpenDialog(
        {
          canSelectFolders: true,
          canSelectFiles: false,
          canSelectMany: false,
          openLabel: "Select",
          title: "Select your arduino projects folder!"
        });

      if (!answer) {
        if (!context.globalState.get<vscode.Uri>("arduinoProjectsPath")) {
          vscode.commands.executeCommand("LTC.addArduinoProjectsPath");
          vscode.window.showErrorMessage("You have to select your arduino projects folder!");
        }
      }
      else {
        var tmp = answer.pop();
        if (tmp) {
          context.globalState.update("arduinoProjectsPath", tmp);
          vscode.window.showInformationMessage("We saved your arduino projects path, you can change it anytime.");
        }
      }
    })
  );


  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openDevicesPanel", () => {

      DeviceSettingPanel.createOrShow(context.extensionUri, model);

      //Handle messages from device setting panel
      DeviceSettingPanel.currentPanel?._panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case 'save':
              context.globalState.update("DevicesModel", model);
              break;
            case 'updateDevice':
              if (sidebarProvider._view?.visible) {
                sidebarProvider.initViewDevice(message.value);
              }

              context.globalState.update("DevicesModel", model);
              break;
            case "init-view":

              var tmpFilePath = context.globalState.get<vscode.Uri>("arduinoLibrariesPath");
              tmpFilePath = vscode.Uri.file(tmpFilePath?.path!);
              if (tmpFilePath) {
                //Add Libraries folder to vscode
                if (!vscode.workspace.getWorkspaceFolder(tmpFilePath)) {
                  vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: tmpFilePath!, name: "Libraries" });
                }

              }
              else {
                vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
              }
              break;
            case "createClass":
              createClass(message.value);
              break;
          }
        }
      );



    }
    )
  );




  //If there is already an opened panel it will show just that
  // if (vscode.window.registerWebviewPanelSerializer) {

  //   // Make sure we register a serializer in activation event
  //   vscode.window.registerWebviewPanelSerializer(DeviceSettingPanel.viewType, {
  //     async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
  //       console.log(`Got state: ${state}`);
  //       // Reset the webview options so we use latest uri for `localResourceRoots`.
  //       webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
  //       DeviceSettingPanel.revive(webviewPanel, context.extensionUri);
  //     }
  //   });
  // }

  function createClass(value: string) {
    var tmp = new Device();
    Object.assign(tmp, JSON.parse(value));;

    while (!context.globalState.get<vscode.Uri>("arduinoLibrariesPath")) {
      vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
    }

    var storedPath = context.globalState.get<vscode.Uri>("arduinoLibrariesPath")!;
    var path = vscode.Uri.file(storedPath.path);

    var errorMessage = DevicesDataHandler.validateModel(tmp);
    if (errorMessage === "") {
      const filePathHeader = vscode.Uri.joinPath(path, tmp.descriptionTabData.name, tmp.descriptionTabData.name + '.h');
      const filePathCpp = vscode.Uri.joinPath(path, tmp.descriptionTabData.name, tmp.descriptionTabData.name + '.cpp');

      const wsedit = new vscode.WorkspaceEdit();

      wsedit.createFile(filePathHeader, { ignoreIfExists: true });
      wsedit.set(filePathHeader, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), createHeader(tmp))]);

      if (fs.existsSync(filePathCpp.fsPath)) {
        var currentCppText = "";
        vscode.workspace.openTextDocument(filePathCpp).then((document) => {
          currentCppText = document.getText();
          let tmpCpp = createCpp(model.devices.find(x => x.id === tmp.id)!, currentCppText);
          wsedit.createFile(filePathCpp, { ignoreIfExists: true });

          wsedit.set(filePathCpp, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), tmpCpp)]);

          vscode.workspace.applyEdit(wsedit);
        });
      } else {
        wsedit.createFile(filePathCpp, { ignoreIfExists: true });
        wsedit.set(filePathCpp, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), createCpp(model.devices.find(x => x.id === tmp.id)!))]);
        vscode.workspace.applyEdit(wsedit);
      }

      //create LTCfiles.h
      var librariesPath = context.globalState.get<vscode.Uri>("arduinoLibrariesPath");

      if (librariesPath) {
        var filePath = vscode.Uri.joinPath(vscode.Uri.file(librariesPath.path), "LTCfiles.h");

        let initString = "#include <Arduino.h>\n";
        model.devices.forEach(dev => {
          initString += "#include <" + dev.descriptionTabData.name + ".h>\n";
        });

        try {
          fs.writeFile(filePath.fsPath, initString, function (err) {
            if (err) {
              return console.log('Error in writing LTCfiles.h: ', err);
            }
            console.log('Updated LTCfiles.h');
          });
        } catch (e) {
          console.log('Error in updating LTCfiles.h:', e);
        }
      }
    }
    else {
      vscode.window.showErrorMessage(errorMessage);
    }
  }



}



function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
  return {
    // Enable javascript in the webview
    enableScripts: true,

    //localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media'), vscode.Uri.joinPath(extensionUri, 'ltcLib')]
  };
}

// this method is called when your extension is deactivated
export async function deactivate() {
  // console.log("Deactivate");
  DeviceSettingPanel.currentPanel?.dispose();
}
