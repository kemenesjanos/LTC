import * as _vscode from "vscode" ;

declare global{
    public const tsvscode: {
        postMessage: ({ command: string, value: any}) => void,
        getState: () => any;
        setState: (state: any) => void;
    };
}