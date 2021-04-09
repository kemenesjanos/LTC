// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { DeviceSettingPanel } from "./DeviceSettingPanel";
import { Alma } from "./alma";
import {Device} from "./Models/deviceData";
import { DataHandler } from "./Data/DataHandler";

var model = new Device();

export function activate(context: vscode.ExtensionContext) {
  if (context.globalState.get<Device>("DevicesModel")) {
    model = context.globalState.get<Device>("DevicesModel") as Device;
  }
    

  vscode.commands.executeCommand('LTC.start');
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
      
      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 500);
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
    vscode.commands.registerCommand("LTC.start", () => {
      DeviceSettingPanel.currentPanel?.dispose();
      DeviceSettingPanel.createOrShow(context.extensionUri, model);
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

  setTimeout(() => {
    DeviceSettingPanel.currentPanel?._panel.webview.onDidReceiveMessage(
      message => {
        const dd = JSON.parse(message.value);
        switch (message.command) {
          case 'update':
            Object.assign(model,dd);
            context.globalState.update("DevicesModel",model);
          case 'update-descriptionTab':
            Object.assign(model.descriptionTabData,dd);
            context.globalState.update("DevicesModel",model);
        }
      },
      null,
    );
  }, 1000);

}



function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		//localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}

// this method is called when your extension is deactivated
export function deactivate() {}
