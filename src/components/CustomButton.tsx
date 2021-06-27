import { useState } from "react";

import { Button } from '@material-ui/core';

import '../styles/customButton.scss';

type ButtonProps = {
	title: string,
	onClick?: any,
	cssClass?: string,
	children?: any,
    isDisabled?: boolean,
}

export function CustomButton(props: ButtonProps) {
	return(
		<div className="button" onClick={ props.onClick }>
			{ props.cssClass ? (
				<Button 
                    variant="outlined" 
                    className={ props.cssClass }
                    disabled={ props.isDisabled || false }
                >
                    { props.children ?? props.children }
                    { props.title }
				</Button>
			) : (
				<Button 
                    variant="outlined" 
                    onClick={ props.onClick }
                    disabled={ props.isDisabled || false }
                >
                    { props.children ?? props.children }
                    { props.title }
				</Button>
			) }
		</div>
	);
}
