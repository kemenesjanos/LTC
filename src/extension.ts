import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { DeviceSettingPanel } from "./DeviceSettingPanel";
import { DevicesData } from "./Models/devicesData";
import * as fs from 'fs';
import { Device } from "./Models/deviceData";
import { createCpp, createHeader } from './Repository/classCreator';
import { DevicesDataHandler } from "./Repository/devicesDataHandler";
import { isThisTypeNode } from "typescript";

var model = new DevicesData();

export function activate(context: vscode.ExtensionContext) {

  vscode.commands.executeCommand("workbench.action.closeEditorInAllGroups");
  
  if (context.globalState.get<vscode.Uri>("arduinoLibrariesPath") === undefined) {
    vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
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
  else{
    //First initialization
    //Get base devices from json
    const filePath = vscode.Uri.joinPath(context.extensionUri, 'src', 'Data', 'baseDevices.json');
    let rawdata = fs.readFileSync(filePath.fsPath);
    model.devices = JSON.parse(rawdata.toString());
  }

  const sidebarProvider = new SidebarProvider(context.extensionUri,model);
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
      if (res) {
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
          title: "Select your arduino libraries folder!\n(Default: C:\\Users\\USERNAME\\Documents\\Arduino\\libraries)"
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
      
      DeviceSettingPanel.createOrShow(context.extensionUri, model);

      //Handle messages from device setting panel
      DeviceSettingPanel.currentPanel!._panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case 'save':
              context.globalState.update("DevicesModel", model);
              break;
            case 'update':
              sidebarProvider.model= model;
              sidebarProvider.initView();
              break; 
            case "init-view":

              var tmpFilePath = context.globalState.get<vscode.Uri>("arduinoLibrariesPath");

              if(tmpFilePath)
              {
                //TODO:: új valami
                if(!vscode.workspace.workspaceFolders?.find(x => x.uri === tmpFilePath)){
                  vscode.window.showInformationMessage(tmpFilePath.fsPath);
                  vscode.workspace.updateWorkspaceFolders(0, null, {uri: tmpFilePath, name: "Libraries"});
                }
                
              }
              else{
                vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
              }
              break;
            case "createClass":
              var tmp = new Device();
              Object.assign(tmp, JSON.parse(message.value));;

              while (context.globalState.get<vscode.Uri>("arduinoLibrariesPath") === undefined) {
                vscode.commands.executeCommand("LTC.addArduinoLibrariesPath");
              }
              var storedPath = context.globalState.get<vscode.Uri>("arduinoLibrariesPath")!;

              var path = vscode.Uri.file(storedPath.path);

              var errorMessage = DevicesDataHandler.validateModel(tmp);
              if(errorMessage === ""){
                //var path = vscode.Uri.joinPath(context.extensionUri,"LTCFiles");

                const filePathHeader = vscode.Uri.joinPath(path, tmp.descriptionTabData.name, tmp.descriptionTabData.name + '.h');
                const filePathCpp = vscode.Uri.joinPath(path, tmp.descriptionTabData.name, tmp.descriptionTabData.name + '.cpp');
  
                const wsedit = new vscode.WorkspaceEdit();
                
                wsedit.createFile(filePathHeader, { ignoreIfExists: true });
                  wsedit.set(filePathHeader, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), createHeader(tmp))]);
                

                if (fs.existsSync(filePathCpp.fsPath)) {
                  var currentCppText = "";
                  vscode.workspace.openTextDocument(filePathCpp).then((document) => {
                    currentCppText = document.getText();
                    let tmpCpp = createCpp(model.devices.find(x => x.id===tmp.id)!, currentCppText);
                    wsedit.createFile(filePathCpp, { ignoreIfExists: true });
                    
                    wsedit.set(filePathCpp, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), tmpCpp)]);
      
                    vscode.workspace.applyEdit(wsedit);
      
                    var vsfolderPath = vscode.Uri.joinPath(path,".vscode");
      
                    if(fs.existsSync(vsfolderPath.fsPath))
                    {
                      vscode.window.showInformationMessage("létezik a vsfolder");
                    }
                    else{
                      vscode.window.showInformationMessage("nem létezik a vsfolder");
                    }
                  });
                } else {
                  wsedit.createFile(filePathCpp, { ignoreIfExists: true });
                  wsedit.set(filePathCpp, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)), createCpp(model.devices.find(x => x.id===tmp.id)!))]);
                  vscode.workspace.applyEdit(wsedit);
                }
  
                
              }
              else{
                vscode.window.showErrorMessage(errorMessage);
              }

              

              

             
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
export async function deactivate() {
  console.log("Deactivate");
  DeviceSettingPanel.kill();
}
