import * as _vscode from "vscode" ;

declare global{
    const tsvscode: {
        postMessage: ({ command: string, value: any}) => void,
        getState: () => any;
        setState: (state: any) => void;
    };
}