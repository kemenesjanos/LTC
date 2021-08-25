import * as _vscode from "vscode" ;

declare global{
    public const vscode: {
        postMessage: ({ command: string, value: any, deviceId: string, methodId: string}) => void;
        getState: () => any;
        setState: (state: any) => void;
    };
}