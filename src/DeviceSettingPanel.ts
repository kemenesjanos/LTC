import { Context } from 'mocha';
import * as vscode from 'vscode';
import { DataHandler } from './Data/DataHandler';
import { getNonce } from './getNonce';
import { Device } from './Models/deviceData';

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		//localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}

/**
 * Manages devices webview panels
 */
export class DeviceSettingPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: DeviceSettingPanel | undefined;

	public static readonly viewType = 'devices';

	public readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];


	//////////////////////////////////////////////////////////////////////////////
	public model: Device = new Device();
	
	//////////////////////////////////////////////////////////////////////////////

	public static createOrShow(extensionUri: vscode.Uri, model: Device) {

		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (DeviceSettingPanel.currentPanel) {
			DeviceSettingPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			DeviceSettingPanel.viewType,
			'Devices',
			column || vscode.ViewColumn.One,
			getWebviewOptions(extensionUri),
		);

		DeviceSettingPanel.currentPanel = new DeviceSettingPanel(panel, extensionUri);

		DeviceSettingPanel.currentPanel.model = model;

	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		DeviceSettingPanel.currentPanel = new DeviceSettingPanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.value);
						return;
					case 'init-view':
						//always run if the panel is in focus
						panel.webview.postMessage({
							command: "init-message",
        					value: JSON.stringify(this.model),
						});
						return;
					case 'update-descriptionTab':
						this.updateDocument("descriptionTab", message.value);
					case 'update':	
						this.updateDocument("full", message.value);
				}
			},
			null,
			this._disposables
		);
	}

	public dispose() {
		DeviceSettingPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);

	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Local path to main script run in the webview
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js');

		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "out/compiled", "TesterPanel.js")
          );

		// Local path to css styles
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');

		// Uri to load styles into webview
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

		// Use a nonce to only allow specific scripts to be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
			const tsvscode = acquireVsCodeApi();
        </script>
			</head>
      <body>
			</body>
      <script src="${scriptUri}" nonce="${nonce}">
			</html>`;
	}

	private updateDocument(type: string, json: string) {

		const dd = JSON.parse(json);

		switch (type) {
			case "full":
				Object.assign(this.model,dd);
				break;
			case "descriptionTab":
				Object.assign(this.model.descriptionTabData,dd);
				break;
			default:
				break;
		}
		
	}
}