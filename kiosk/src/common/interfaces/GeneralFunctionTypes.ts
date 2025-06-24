export type SimpleFunction = () => void;
export type SimpleFunctionAsync = () => Promise<void>;
export type SimpleFunctionHandler = null | SimpleFunction | SimpleFunctionAsync;

export type MouseEventFunction = (event?: React.MouseEvent) => void;
