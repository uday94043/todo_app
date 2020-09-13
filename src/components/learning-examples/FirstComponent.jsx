import React, { Component } from 'react';
export default class FirstComponent extends Component {
    render() {
        return (
            <div className="First">
                FC
            </div>
        );
    }
}


export function ThirdComponent() {
    return (
        <div className="third">
            component which does not have state
        </div>
    )
}