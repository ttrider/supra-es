export interface ITimingValue {
    // #region Properties (2)

    valueNano: number;
    valueTime: string;
}

    // #endregion Properties (2)
export interface ITiming extends ITimingValue {
    // #region Properties (2)

    count?: number;
    name?: string;

    // #endregion Properties (2)
}

export interface ITimings {
    // #region Properties (2)

    breakdown: ITiming[];
    timing: ITimingValue;

    // #endregion Properties (2)
}