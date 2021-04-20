// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { DeviceSettingPanel } from "./DeviceSettingPanel";
import {DevicesData} from "./Models/devicesData";
import { Console } from "node:console";
import { DevicesDataHandler } from "./Repository/devicesDataHandler";
import * as fs from 'fs';

var model = new DevicesData();

export function activate(context: vscode.ExtensionContext) {


  if(context.globalState.get<boolean>("isNewFile") === true){
    const newFileName = context.globalState.get<string>("newFileName")?.valueOf();

    vscode.window.showInformationMessage("bejutott");
    context.globalState.update("isNewFile",false);

    const initString=
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



    const filePath=vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', newFileName + '.ino');

    const wsedit = new vscode.WorkspaceEdit();
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.set(filePath, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0,0),new vscode.Position(10,0)),initString)]);

    vscode.workspace.applyEdit(wsedit).then(() =>{
      vscode.workspace.openTextDocument(filePath).then(() =>{
        vscode.commands.executeCommand('arduino.initialize').then(() =>{
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
  if(typeof context.globalState.get<DevicesData>("DevicesModel") !== typeof undefined){
    model = context.globalState.get<DevicesData>("DevicesModel") as DevicesData;
  }

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("LTC-sidebar", sidebarProvider),
  );

  //vscode.workspace.getConfiguration("editor.suggest.showConstants").update("editor.suggest.showConstants", true, false);5

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.addMessage", async () => {
      vscode.window.showInformationMessage('sikerult!');

      let doc = await vscode.workspace.openTextDocument("D:/letöltések/Tesztelunk/korte.ino");
        //vscode.Uri.joinPath(context.extensionUri, 'ltcLib', 'alma.txt')); // calls back into the provider

      await vscode.window.showTextDocument(doc, { preview: false });

      const wsedit = new vscode.WorkspaceEdit();
      const filePath=vscode.Uri.parse("D:/letöltések/Tesztelunk/korte.ino");//vscode.Uri.joinPath(context.extensionUri, 'ltcLib', 'korte.txt');

      wsedit.createFile(filePath, { ignoreIfExists: true });
      wsedit.set(filePath, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0,0),new vscode.Position(2,0)),"asldmsada")]);
      vscode.workspace.applyEdit(wsedit);

      let docc = await vscode.workspace.openTextDocument(
        filePath); // calls back into the provider

      await vscode.window.showTextDocument(docc, { preview: false });
        
/* 
      sidebarProvider._view?.webview.postMessage({
        command: "add-message",
        value: new Alma("jéjjj",33),
      });

      TesterPanel.currentPanel?._panel.webview.postMessage({
        command: "test-message",
        value: "juhuhúú"
      }); */
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.refresh", async () => {
      // HelloWorldPanel.kill();
      // HelloWorldPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.LTC-sidebar-view"
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openLTCProject", async () =>{
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
          
            //TODO: implement to select ino file and open the containing folder
            vscode.window.showOpenDialog(options).then(fileUri => {
                if (fileUri && fileUri[0]) {
                    vscode.window.showInformationMessage('Selected file: ' + fileUri[0].fsPath);
                    vscode.workspace.updateWorkspaceFolders(0,
                      undefined,
                      {uri:  fileUri[0]});
                }
                
            });
    })
  );

  context.subscriptions.push(

    //TODO: when an other project is open the new project will not be initialized
    vscode.commands.registerCommand("LTC.newLTCProject", async () => {
      vscode.window.showInformationMessage("newLTCProject");
      const res = await vscode.window.showInputBox({prompt: "What should be the name of the new project?"});
      if(res !== undefined){
       const filePath = vscode.Uri.joinPath(context.extensionUri, 'ltcLib', res + 'Project');

        if (!fs.existsSync(filePath.fsPath)) {
          vscode.workspace.updateWorkspaceFolders(0,
            undefined,
            {uri: filePath ,name: res + 'Project'});

          await context.globalState.update("newFileName", res);
          await context.globalState.update("isNewFile", true);
          // await vscode.commands.executeCommand('vscode.openFolder',
          // vscode.Uri.joinPath(context.extensionUri, 'ltcLib', res + 'Project'),false);
          await vscode.commands.executeCommand('workbench.action.reloadWindow');
        }
        else{
          vscode.window.showErrorMessage("File is already exist!");
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.askQuestion", async () => {
      const answer = await vscode.window.showInformationMessage(
        "How was your day?",
        "good",
        "bad"
      );

      if (answer === "bad") {
        vscode.window.showInformationMessage("Sorry to hear that");
      } else {
        console.log({ answer });
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.reInit", async () =>{

      //TODO: get file name from somewhere else
      const newFileName = context.globalState.get<string>("newFileName")?.valueOf();
      const filePath=vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', newFileName + '.ino');

      if(fs.existsSync(vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', '.vscode').fsPath)){
        var rimraf = require("rimraf");
        rimraf.sync(vscode.Uri.joinPath(context.extensionUri, 'ltcLib', newFileName + 'Project', '.vscode').fsPath);
      }
      

      setTimeout(() => {
        vscode.commands.executeCommand('arduino.initialize').then(() =>{
          vscode.commands.executeCommand('arduino.selectSerialPort');
          });
      }, 1000);
    })  
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openDevicesPanel", () => {
      DeviceSettingPanel.currentPanel?.dispose();
      DeviceSettingPanel.createOrShow(context.extensionUri, model);

      //Handle messages from device setting panel
      DeviceSettingPanel.currentPanel?._panel.webview.onDidReceiveMessage(
        (message) => {
          const dd = JSON.parse(message.value);
          switch (message.command) {
            // case 'update':
            //   Object.assign(model,dd);
              
            //   break;
            case 'save':
              context.globalState.update("DevicesModel",model);
              break;
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

		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media'),vscode.Uri.joinPath(extensionUri, 'ltcLib')]
	};
}

// this method is called when your extension is deactivated
export function deactivate() {
}
