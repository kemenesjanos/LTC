// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { DeviceSettingPanel } from "./DeviceSettingPanel";
import {DevicesData} from "./Models/devicesData";
import { Console } from "node:console";
import { DevicesDataHandler } from "./Repository/devicesDataHandler";

var model = new DevicesData();

export function activate(context: vscode.ExtensionContext) {

  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  item.text = "$(tools) Devices";
  item.command = "LTC.openDevicesPanel";
  item.show();

  //context.globalState.update("DevicesModel",model);
  if(typeof context.globalState.get<DevicesData>("DevicesModel") !== typeof undefined){
    model = context.globalState.get<DevicesData>("DevicesModel") as DevicesData;
    vscode.window.showInformationMessage(JSON.stringify(model));
  }

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("LTC-sidebar", sidebarProvider),
  );

  //vscode.workspace.getConfiguration("editor.suggest.showConstants").update("editor.suggest.showConstants", true, false);5

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.addMessage", async () => {
      vscode.window.showInformationMessage('sikerult!');

      let doc = await vscode.workspace.openTextDocument(
        vscode.Uri.joinPath(context.extensionUri, 'ltcLib', 'alma.txt')); // calls back into the provider

      await vscode.window.showTextDocument(doc, { preview: false });

      const wsedit = new vscode.WorkspaceEdit();
      const filePath = vscode.Uri.joinPath(context.extensionUri, 'ltcLib', 'korte.txt');

      wsedit.createFile(filePath, { ignoreIfExists: true });
      wsedit.set(filePath, [new vscode.TextEdit(new vscode.Range(new vscode.Position(0,0),new vscode.Position(2,0)),"asldmsada")]);
      vscode.workspace.applyEdit(wsedit);

      let docc = await vscode.workspace.openTextDocument(
        vscode.Uri.joinPath(context.extensionUri, 'ltcLib', 'korte.txt')); // calls back into the provider

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
    vscode.commands.registerCommand("LTC.newLTCProject", () => {
      vscode.window.showInformationMessage("newLTCProject");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openLTCProject", () => {
      vscode.window.showInformationMessage("openLTCProject");
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