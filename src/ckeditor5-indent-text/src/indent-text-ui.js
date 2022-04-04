import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import indentLeft from "../theme/icons/IndentTextLeft.svg";
import indentRight from "../theme/icons/IndentTextRight.svg";
import {INDENT_TEXT_COMMAND, INDENT_TEXT_DEFAULT_VALUE} from "./constants";

/**
 * Indent text ui plugin
 */
export class IndentTextUi extends Plugin {
    /**
     * Init plugin
     */
    init() {
        const editor = this.editor;
        const options = editor.config.get('indentText.options');
        const indentLength = (options && options.indentLength) ? options.indentLength : INDENT_TEXT_DEFAULT_VALUE;
		const schema = editor.model.schema;

		//schema.extend( '$block', { allowAttributes: 'alignment' } );
		//editor.model.schema.setAttributeProperties( 'alignment', { isFormatting: true } );

        editor.ui.componentFactory.add('indentLeft', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Indent left',
                icon: indentLeft,
                tooltip: true,
                class: 'indent-left',
            });

            view.on('execute', () => {
                editor.execute(INDENT_TEXT_COMMAND, {value: -indentLength});
            });

            return view;
        });

        editor.ui.componentFactory.add('indentRight', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Indent right',
                icon: indentRight,
                tooltip: true,
                class: 'indent-right',
            });

            view.on('execute', () => {
                editor.execute(INDENT_TEXT_COMMAND, {value: indentLength});
            });

            return view;
        });
    }
}
