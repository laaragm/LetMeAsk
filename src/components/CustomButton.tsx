import { useState } from "react";

import { Button } from '@material-ui/core';

import '../styles/customButton.scss';

type ButtonProps = {
	title: string,
	onClick?: any,
	cssClass?: string,
	children?: any,
	isDisabled?: boolean,
	isOutlined?: boolean
}

export function CustomButton({ isOutlined = true, ...props }: ButtonProps) {
	return(
		<div className="button" onClick={ props.onClick }>
			<Button 
				variant={ isOutlined ? 'outlined' : 'contained' }
				className={ props.cssClass ? props.cssClass : '' }
				disabled={ props.isDisabled || false }
			>
				{ props.children ?? props.children }
				{ props.title }
			</Button>
		</div>
	);
}
