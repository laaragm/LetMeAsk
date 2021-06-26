import { useState } from "react";

import { Button } from '@material-ui/core';

import '../styles/customButton.scss';

type ButtonProps = {
	title: string,
	cssClass?: string,
	children?: any,
}

export function CustomButton(props: ButtonProps) {
	return(
		<div className="button">
			{ props.cssClass ? (
				<Button variant="outlined" className={ props.cssClass }>
					{ props.children ?? props.children }
					{ props.title }
				</Button>
			) : (
				<Button variant="outlined">
					{ props.children ?? props.children }
					{ props.title }
				</Button>
			) }
		</div>
	);
}
