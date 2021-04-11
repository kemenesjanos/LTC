// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { DeviceSettingPanel } from "./DeviceSettingPanel";
import { Alma } from "./alma";
import {Device} from "./Models/deviceData";
import { DataHandler } from "./Data/DataHandler";
import { Console } from "node:console";

var model = new Device();

export function activate(context: vscode.ExtensionContext) {

  setTimeout(() => {
    //vscode.commands.executeCommand("LTC.openDevicesPanel");
  }, 200); 

  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  item.text = "$(tools) Devices";
  item.command = "LTC.openDevicesPanel";
  item.show();

  if(context.globalState.get<Device>("DeviceModel") !== undefined){
    model = context.globalState.get<Device>("DeviceModel") as Device;
  }

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("LTC-sidebar", sidebarProvider),
  );

  //vscode.workspace.getConfiguration("editor.suggest.showConstants").update("editor.suggest.showConstants", true, false);5

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.addMessage", () => {
      vscode.window.showInformationMessage('sikerult!');
        
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

  if(DeviceSettingPanel.currentPanel?._panel){
    vscode.commands.executeCommand("LTC.openDevicesPanel");
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.openDevicesPanel", () => {
      DeviceSettingPanel.currentPanel?.dispose();
      DeviceSettingPanel.createOrShow(context.extensionUri, model);

      //Handle messages from device setting panel
      DeviceSettingPanel.currentPanel?._panel.webview.onDidReceiveMessage(
        (message) => {
          const dd = JSON.parse(message.value);
          switch (message.command) {
            case 'update':
              Object.assign(model,dd);
              context.globalState.update("DeviceModel",model);
              break;
            case 'update-descriptionTab':
              Object.assign(model.descriptionTabData,dd);
              context.globalState.update("DeviceModel",model);
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

		//And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}

// this method is called when your extension is deactivated
export function deactivate() {

}