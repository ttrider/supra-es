import React from 'react';
import ISurfaceController from 'src/models/ISurfaceController';
import styles from "../controllers/styles";

export declare type Classes = { [name in keyof typeof styles]: string };

export interface ISurfaceControllerProvider {

    controller: ISurfaceController;

    classes: Classes;
}

export class SurfaceContextProvider implements ISurfaceControllerProvider {

    public controller: ISurfaceController;

    public classes: Classes;

}

export const SurfaceContext = React.createContext<SurfaceContextProvider>(new SurfaceContextProvider());


