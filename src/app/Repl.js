import React from 'react';
import Editor from '@monaco-editor/react';
import '../css/Repl.css';

const Repl = () => {

    return(
        <div className="editor">

            <div className="editor_header"></div>
            <div className="editor_body">
                <div className='editor_folder_structure'>

                </div>
                
                <div className='editor_code_window'>
                     <Editor
                        theme='vs-dark'
                        height='92vh'
                        width={1500}
                        defaultLanguage="javascript"/>
                </div>
            </div>
            <div className="editor_footer"></div>

        </div>
    );
}

export default Repl;