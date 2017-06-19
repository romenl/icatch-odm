import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';

let timer;

export default class ICPlayer extends Component {
    constructor(props){
        super(props);
        
        let isSupportable = this.browserSupportsNaCl();
        this.state = {
            supportsNaCl: isSupportable,
            status: isSupportable ? 'NO-STATUSES' : 'BROWSER NOT-SUPPORTABLE',
            isPlaying: false,
            isFullscreen: false
        };
    }
    componentDidMount(){
        let icPlayer = this.refs['icplayer'];
        icPlayer.addEventListener('message', this.handleMessage.bind(this), true);
        icPlayer.addEventListener('error', this.handleError.bind(this), true);
        icPlayer.addEventListener('crash', this.handleCrash.bind(this), true);

        this.setState({
            status: 'RUNNING'
        });
    }
    handlePlay(){      
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            const { isPlaying } = this.state,
                  url      = "rtsp://192.168.3.45/0",
                  username = "admin",
                  pwd      = "admin";

            if ( isPlaying ) {
                //this.command( 'stop', '0' );

                this.setState({ isPlaying: false });
            }
            else {
                console.log( "[handlePlay] URL: ", url );
                this.command( 'play', [url, username, pwd] );

                this.setState({ isPlaying: true });
            }
        }, 250);
    }
    handleFullscreen(){
        clearTimeout(timer);

        const { isFullscreen } = this.state,
              icPlayer = this.refs['icplayer'];

        if ( isFullscreen )
        {
            if ( document.exitFullscreen )
                document.exitFullscreen();
            else if ( document.msExitFullscreen )
                document.msExitFullscreen();
            else if ( document.mozCancelFullScreen )
                document.mozCancelFullScreen();
            else if ( document.webkitExitFullscreen )
                document.webkitExitFullscreen();

            this.setState({ isFullscreen: false });
        }
        else
        {
            if ( icPlayer.requestFullscreen )
                icPlayer.requestFullscreen();
            else if ( icPlayer.msRequestFullscreen )
                icPlayer.msRequestFullscreen();
            else if ( icPlayer.mozRequestFullScreen )
                icPlayer.mozRequestFullScreen();
            else if ( icPlayer.webkitRequestFullscreen )
                icPlayer.webkitRequestFullscreen();

            this.setState({ isFullscreen: true });
        }
    }
    handleMessage(msgEvent){
        this.logMessage(msgEvent.data);
    }
    handleError(e){
        const naclModule = this.refs['nacl_module'];

        this.setState({
            status: `ERROR [${ naclModule.lastError }]`
        });
    }
    handleCrash(e){
        const naclModule = this.refs['nacl_module'];

        alert( 'CRASH' );

        this.setState({
            status: naclModule.exitStatus === -1 ? `CRASH` : `EXITED [${ naclModule.exitStatus }]`
        });
    }
    logMessage(message) {
        const kMaxLogMessageLength = 20;
        let logMessageArray = [];
        
        logMessageArray.push(message);
        if (logMessageArray.length > kMaxLogMessageLength)
            logMessageArray.shift();

        console.log(message);
    }
    browserSupportsNaCl() {
        return navigator.mimeTypes['application/x-pnacl'] !== undefined;
    }
    command(action, args){
        const naclModule = this.refs['nacl_module'];
        naclModule.postMessage([ action, ...args ]);
    }
    render(){
        const { supportsNaCl, isPlaying, isFullscreen } = this.state;
        return (
            <div id="icplayer" ref="icplayer">
                <div id="icp_gradient_bottom"></div>
                <div id="icp_cover" onClick={this.handlePlay.bind(this)} onDoubleClick={this.handleFullscreen.bind(this)}></div>
                <div id="icp_controller">
                    <Icon id="icp_play" type={ isPlaying ? "pause" : "caret-right" } onClick={this.handlePlay.bind(this)} />
                    <Tooltip title={ isFullscreen ? "End Fullscreen" : "Fullscreen" }>
                        <Icon id="icp_fullscreen" type={ isFullscreen ? "shrink" : "arrows-alt" } onClick={this.handleFullscreen.bind(this)} />
                    </Tooltip>
                </div>
                {
                    supportsNaCl ? 
                    <embed 
                        name="nacl_module" 
                        id="nacl_module" 
                        ref="nacl_module"
                        src="pnacl/Release/calcite.nmf"
                        type="application/x-pnacl"
                        />
                    :
                    <h2>Sorry you device doesn't support NaCl module.</h2>
                }
            </div>
        );
    }
}