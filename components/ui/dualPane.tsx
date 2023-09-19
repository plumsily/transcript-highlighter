import React from 'react';
import './dualPane.css';

interface DualPaneProps {
    leftChild: React.ReactNode;
    rightChild: React.ReactNode;
}

const SideBySideDivs: React.FC<DualPaneProps> = ({leftChild, rightChild}) => {
    return (
        <div className="container">
            <div className="left-div">
                {leftChild}
            </div>
            <div className="right-div">
                {rightChild}
            </div>
        </div>
    );
}

export default SideBySideDivs;