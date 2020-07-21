import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
    BoldPlugin,
    ItalicPlugin,
];

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'bold',
            'italic',
        ]
    }
};
    ClassicEditor
        .create( document.querySelector( '#editor1' ) )
        .then( editor => {
            console.log( editor );
            window.editor = editor;
            editor.model.document.on( 'change:data', ( evt, data ) => {
                console.log('here data', data );
                  try {
                        window.ReactNativeWebView.postMessage('test')
                    }
                    catch (e) {
                        alert(e)
                }
            } );
            editor.editing.view.document.on( 'change:isFocused', ( evt, name, value ) => {
                console.log( 'editable isFocused =', value );
                window.ReactNativeWebView.postMessage('RNCKEditor5:onFocus:' + value);
            } );
        } )
        .catch( error => {
            console.error( error );
        } );