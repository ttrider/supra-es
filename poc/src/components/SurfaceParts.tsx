import React from 'react';
import TextBoxLayout from 'src/controllers/layout/TextBoxLayout';
import TextLayout from 'src/controllers/layout/TextLayout';
import { ISurfaceControllerProvider, SurfaceContext } from './SurfaceContext';


export function SurfaceText(props: { layout?: TextLayout, context?: ISurfaceControllerProvider, className?: string }) {

    const { layout, context, className } = props;

    if (!layout) {
        return <></>;
    }

    if (!className) {
        return <text {...layout.textClient} />;
    }

    if (context) {
        return <text {...layout.textClient} className={context.classes[className]} />;
    }

    return (
        <SurfaceContext.Consumer>
            {({ classes }) => (<text {...layout.textClient} className={classes[className]} />)}
        </SurfaceContext.Consumer>
    );
}

export function SurfaceTextBox(props: { layout?: TextBoxLayout, context?: ISurfaceControllerProvider, className?: string }) {

    const { layout, context, className } = props;

    if (!layout) {
        return <></>;
    }

    if (!className) {
        return <>{render(layout)}</>
    }

    if (context) {
        return <>{render(layout, context.classes[className])}</>
    }

    return (
        <SurfaceContext.Consumer>
            {({ classes }) => render(layout, classes[className])}
        </SurfaceContext.Consumer>
    );

    function render(textBox: TextBoxLayout, cn?: string) {
        return textBox.textClients.map(item =>
            <text key={`stb_${item.y}`} {...item} className={cn} />
        )
    }
}
