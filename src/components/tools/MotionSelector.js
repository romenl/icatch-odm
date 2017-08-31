import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/motionSelector.scss';

export default class MotionSelector extends Component {
    constructor(props){
        super(props);
        const {
            width = 480,
            height = 360,
            columns = 24,
            rows = 18
        } = this.props;

        this.state = {
            // Init from props
            width, height, columns, rows,
            selecting: false,
            start: '0-0'
        };
    }
    handleClick(e){
        const target = e.target;        
        target.classList.toggle('selected');
    }
    handleMouseDown(e) {
        const target = e.target;
        this.setState({
            selecting: true,
            start: target.id
        });
    }
    handleMouseUp(e) {
        const { columns, rows } = this.state;

        this.setState({ selecting: false });

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                if (this.refs[`${x}-${y}`].classList.contains('selecting'))
                    this.refs[`${x}-${y}`].classList.toggle('selected');

                this.refs[`${x}-${y}`].classList.remove('selecting', 'dirty');
            }
        }
    }
    handleMouseOver(e) {
        const target = e.target;
        const { selecting } = this.state;
        if (selecting)
            this.handleSelected(target);
    }
    handleSelected(target) {
        const { start, columns, rows } = this.state;
        // Init selected range
        let start_x = parseInt(start.split('-')[0], 10),
            start_y = parseInt(start.split('-')[1], 10);
        let current_x = parseInt(target.id.split('-')[0], 10),
            current_y = parseInt(target.id.split('-')[1], 10);
        // Check selected range
        if (current_x < start_x)
            current_x = [start_x, start_x = current_x][0];
        if (current_y < start_y)
            current_y = [start_y, start_y = current_y][0];
        // Select    
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                if (x >= start_x && x <= current_x &&
                    y >= start_y && y <= current_y) {
                    if (this.refs[`${x}-${y}`].classList.contains('selected'))
                        this.refs[`${x}-${y}`].classList.add('selected');

                    this.refs[`${x}-${y}`].classList.add('selecting', 'dirty');
                }
                else
                    if (this.refs[`${x}-${y}`].classList.contains('dirty'))
                        this.refs[`${x}-${y}`].classList.remove('selecting');
            }
        }
    }
    outputSelected() {
        let result = '';

        Object.keys(this.refs).forEach((ref) => {
            if (this.refs[ref].classList.contains('selected'))
                result += '1';
            else
                result += '0';
        });

        console.log(result);
    }
    handleEnableAll(){
        const { columns, rows } = this.state;
        
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.refs[`${x}-${y}`].classList.add('selected');
            }
        }
    }
    handleDisableAll(){
        const { columns, rows } = this.state;
        
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.refs[`${x}-${y}`].classList.remove('selected');
            }
        }
    }
    render() {
        const { width, height, columns, rows } = this.state;

        let { 
            EnableAllButton = <button></button>,
            DisableAllButton = <button></button> 
        } = this.props;

        EnableAllButton = React.cloneElement( EnableAllButton, {
                onClick: this.handleEnableAll.bind(this)
            }, 'Enable all Region' );

        DisableAllButton = React.cloneElement( DisableAllButton, {
                onClick: this.handleDisableAll.bind(this)
            }, 'Disable all Region' );

        const style = {
            cover: {
                width: width,
                height: height,
                outline: '1px solid black'
            },
            grid: {
                width: width / columns,
                height: height / rows
            },
            buttonBlock: {
                textAlign: 'center'
            },
            button: {
                display: 'inline-block',
                margin: '15px 10px'
            }
        };

        const motionGrids = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                motionGrids.push(
                    <div
                        id={`${c}-${r}`}
                        ref={`${c}-${r}`}
                        key={`${c}-${r}`}
                        className='motion_grid'
                        style={style.grid}
                        onClick={this.handleClick.bind(this)}
                        onMouseDown={this.handleMouseDown.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)}
                        onMouseOver={this.handleMouseOver.bind(this)}>
                    </div>
                )
            }
        }


        return (
            <div>
                <div style={style.cover}>
                {
                    motionGrids
                }
                </div>
                <div style={style.buttonBlock}>
                    <div style={style.button}>{EnableAllButton}</div>
                    <div style={style.button}>{DisableAllButton}</div>
                </div>
            </div>
        );
    }
}

MotionSelector.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    columns: PropTypes.number,
    rows: PropTypes.number,
    EnableAllButton: PropTypes.node,
    DisableAllButton: PropTypes.node
}