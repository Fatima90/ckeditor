import React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  onMessage = event => {
    const data = event.nativeEvent.data;
    console.log('Data from ckeditor:', data);
  };

  createWebViewRef = webview => {
    this.webview = webview;
  };

  onWebViewLoaded = () => {
    console.log('Webview loaded');
    // this.setState({ webViewNotLoaded: false });
    this.postMessage('contnet should go here');
  };

  handleMessage = event => {
    console.log('event', event);
    let msgData;a
    try {
      msgData = event.nativeEvent.data;
      console.log('msgData', msgData);
      this.props.onChange(msgData);
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  const params = 'platform='+Platform.OS;
  const injectedJS = `
    if (!window.location.search) {
      var link = document.getElementById('progress-bar');
      link.href = './site/index.html?${params}';
      link.click();
    }
  `;

  const sourceUri = (
    Platform.OS === 'android' 
      ? 'file:///android_asset/' 
      : ''
  ) + 'Web.bundle/loader.html';

  return (
    <WebView
      ref={c => this.webview = c}
      style={{ marginTop: 50 }}
      scrollEnabled={false}
      injectedJavaScript={injectedJS}
      source={{ uri: sourceUri }}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      allowFileAccess={true}
      onError={this.onError}
      renderError={this.renderError}
      onMessage={this.onMessage}
    />
  );
}
