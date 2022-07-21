import './dialog.scss';
import { ReactComponent as Close } from 'assets/ic_close_24px.svg';
import { ReactNode } from 'react';
import classnames from 'classnames';

export interface DialogProps {
    children: ReactNode;
    title: string | JSX.Element;
    layoutClassName?: string;
    containerClassName?: string;
    closeOnBackClick?: boolean;
    close?: JSX.Element;

    onClose(): void;
}

export function ModalDialog(props: DialogProps) {
    return (
        <div
            className={classnames('dialog-layout', props.layoutClassName)}
            onClick={props.closeOnBackClick ? props.onClose : undefined}
        >
            <div
                className={classnames('modal-container', props.containerClassName)}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <header
                    className={'modal-container__header'}
                >
                    <div
                        className={'modal-container__title'}
                    >
                        {props.title}
                    </div>
                    <button
                        onClick={props.onClose}
                        className={'modal-container__close'}
                    >
                        {props.close ?? <Close/>}
                    </button>
                </header>
                <section
                    className={'modal-container__content'}
                >
                    {props.children}
                </section>
            </div>
        </div>
    );
}
