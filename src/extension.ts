// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { TesterPanel } from "./TesterPanel";
import { Alma } from "./alma";
import {DescriptionTabData} from "./Models/descriptionTabData";

const model = new DescriptionTabData();

export function activate(context: vscode.ExtensionContext) {

  vscode.commands.executeCommand('LTC.start');
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("LTC-sidebar", sidebarProvider),
  );

  //vscode.workspace.getConfiguration("editor.suggest.showConstants").update("editor.suggest.showConstants", true, false);

  context.subscriptions.push(
    vscode.commands.registerCommand("LTC.addMessage", () => {
      vscode.window.showInformationMessage('sikerult!');

      sidebarProvider._view?.webview.postMessage({
        command: "add-message",
        value: new Alma("jéjjj",33),
      });

      TesterPanel.currentPanel?._panel.webview.postMessage({
        command: "test-message",
        value: "juhuhúú"
      });
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
      TesterPanel.createOrShow(context.extensionUri, model);
    }
  ));

  if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(TesterPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
				TesterPanel.revive(webviewPanel, context.extensionUri);
			}
		});
	}

  setTimeout(() => {
    TesterPanel.currentPanel?._panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'update':
            const dtd = JSON.parse(message.value);
            Object.assign(model,dtd);
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
