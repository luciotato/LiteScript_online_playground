    
    public namespace ace

        properties

            config:
                get:function(key) 
                set:function(key, value) 
                all:function() 
                _dispatchEvent:function(eventName, e) 
                _emit:function(eventName, e) 
                _signal:function(eventName, e) 
                once:function(eventName, callback) 
                setDefaultHandler:function(eventName, callback) 
                removeDefaultHandler:function(eventName, callback) 
                addEventListener:function(eventName, callback, capturing) 
                on:function(eventName, callback, capturing) 
                removeEventListener:function(eventName, callback) 
                removeListener:function(eventName, callback) 
                off:function(eventName, callback) 
                removeAllListeners:function(eventName) 
                moduleUrl:function(name, component) 
                setModuleUrl:function(name, subst) 


                loadModule:function(moduleName, onLoad) 
                init:function() 
                defineOptions:function(obj, path, options) 
                resetOptions:function(obj) 
                setDefaultValue:function(path, name, value) 
                setDefaultValues:function(path, optionHash) 
                _eventRegistry:object
                _defaultHandlers:object
        method define(amodule, deps, payload) 
        method require(amodule, callback) 
        method edit(el) 
        method createEditSession(text, mode) 
        
        class Fold
            constructor new Fold (range, placeholder) 
            
            method toString() 
            method setFoldLine(foldLine) 
            method clone() 
            method addSubFold(fold) 
            method restoreRange(range) 
            
            
        class TokenIterator
            constructor new TokenIterator (session, initialRow, initialColumn) 
            
            method stepBackward() 
            method stepForward() 
            method getCurrentToken() 
            method getCurrentTokenRow() 
            method getCurrentTokenColumn() 
            
            
        class EditSession
            constructor new EditSession (text, mode) 
            
            properties
        
                doc: Document
            
                $mode:object
                $foldStyle:string

                $wrapLimitRange:
                    min:object
                    max:object

                $useWorker:boolean
                $useSoftTabs:boolean
                $scrollTop:number

                $options:
                    wrap:
                        set:function(value) 
                        get:function() 
                        handlesSet:boolean
                        name:string


                    firstLineNumber:
                        set:function() 
                        initialValue:number
                        name:string


                    useWorker:
                        set:function(useWorker) 
                        initialValue:boolean
                        name:string


                    useSoftTabs:
                        initialValue:boolean
                        name:string


                    tabSize:
                        set:function(tabSize) 
                        initialValue:number
                        handlesSet:boolean
                        name:string


                    overwrite:
                        set:function(val) 
                        initialValue:boolean
                        name:string


                    newLineMode:
                        set:function(val) 
                        get:function() 
                        handlesSet:boolean
                        name:string

                $scrollLeft:number

                $defaultUndoManager:
                    undo:function() 
                    redo:function() 
                    reset:function() 

                $modeId:object
                $tabSize:number
                $firstLineNumber:number
                $wrapLimit:number

                $foldStyles:
                    manual:number
                    markbegin:number
                    markbeginend:number

                $overwrite:boolean
                $useWrapMode:boolean
            method _signal(eventName, e) 
            method getDocumentLastRowColumn(docRow, docColumn) 
            method clearAnnotations() 
            method setTabSize(tabSize) 
            method $findClosingBracket(bracket, position, typeRe) 
            method getRowSplitData(row) 
            method getRowLength(row) 
            method foldAll(startRow, endRow, depth) 
            method getScreenWidth() 
            method setWrapLimitRange(min, max) 
            method _emit(eventName, e) 
            method $cloneFoldData() 
            method getWordRange(row, column) 
            method $getDisplayTokens(str, offset) 
            method unfold(location, expandInner) 
            method getTokenAt(row, column) 
            method $getStringScreenWidth(str, maxScreenColumn, screenColumn) 
            method getScrollTop() 
            method getDocumentLastRowColumnPosition(docRow, docColumn) 
            method $constrainWrapLimit(wrapLimit, min, max) 
            method toggleOverwrite() 
            method getFoldsInRange(range) 
            method getTabString() 
            method off(eventName, callback) 
            method adjustWrapLimit(desiredLimit, $printMargin) 
            method setNewLineMode(newLineMode) 
            method getUndoManager() 
            method moveLinesDown(firstRow, lastRow) 
            method getTabSize() 
            method $computeWidth(force) 
            method setOptions(optList) 
            method setAnnotations(annotations) 
            method $updateRowLengthCache(firstRow, lastRow, b) 
            method getAnnotations() 
            method setValue(text) 
            method getDisplayLine(row, endColumn, startRow, startColumn) 
            method removeAllListeners(eventName) 
            method expandFolds(folds) 
            method getLine(row) 
            method getSelection() 
            method getRowFoldEnd(docRow, startFoldRow) 
            method onReloadTokenizer(e) 
            method getOptions(optionNames) 
            method setUseWrapMode(useWrapMode) 
            method getValue() 
            method addMarker(range, clazz, type, inFront) 
            method $moveLines(firstRow, lastRow, dir) 
            method $findOpeningBracket(bracket, position, typeRe) 
            method $clipRangeToDocument(range) 
            method outdentRows(range) 
            method getNewLineMode() 
            method on(eventName, callback, capturing) 
            method getParentFoldRangeData(row, ignoreCurrent) 
            method $setFolding(foldMode) 
            method getNextFoldLine(docRow, startFoldLine) 
            method getFoldAt(row, column, side) 
            method $clipColumnToRow(row, column) 
            method undoChanges(deltas, dontSelect) 
            method getState(row) 
            method addFold(placeholder, range) 
            method addEventListener(eventName, callback, capturing) 
            method removeListener(eventName, callback) 
            method onChangeFold(e) 
            method $detectNewLine(text) 
            method removeMarker(markerId) 
            method getCommentFoldRange(row, column, dir) 
            method getBreakpoints() 
            method expandFold(fold) 
            method removeDefaultHandler(eventName, callback) 
            method moveText(fromRange, toPosition, copy) 
            method markUndoGroup() 
            method removeEventListener(eventName, callback) 
            method isTabStop(position) 
            method getDocument() 
            method $getUndoSelection(deltas, isUndo, lastUndoRange) 
            method $clipPositionToDocument(row, column) 
            method getAllFolds() 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method getAWordRange(row, column) 
            method getWrapLimit() 
            method toString() 
            method $clipRowToDocument(row) 
            method screenToDocumentPosition(screenRow, screenColumn) 
            method setBreakpoint(row, className) 
            method getWrapLimitRange() 
            method resetCaches() 
            method getOverwrite() 
            method indentRows(startRow, endRow, indentString) 
            method clearBreakpoints() 
            method addFolds(folds) 
            method remove(range) 
            method documentToScreenColumn(row, docColumn) 
            method getTextRange(range) 
            method $onChangeMode(mode, $isPlaceholder) 
            method screenToDocumentRow(screenRow, screenColumn) 
            method documentToScreenRow(docRow, docColumn) 
            method getScreenLastRowColumn(screenRow) 
            method $addFoldLine(foldLine) 
            method setOverwrite(overwrite) 
            method getMarkers(inFront) 
            method getLength() 
            method $startWorker() 
            method $updateWrapData(firstRow, lastRow) 
            method getBracketRange(pos) 
            method updateFoldWidgets(e) 
            method getScreenTabSize(screenColumn) 
            method setBreakpoints(rows) 
            method clearBreakpoint(row) 
            method $computeWrapSplits(tokens, wrapLimit) 
            method getFoldedRowCount(first, last) 
            method getOption(name) 
            method removeGutterDecoration(row, className) 
            method getFoldDisplayLine(foldLine, endRow, endColumn, startRow, startColumn) 
            method getFoldStringAt(row, column, trim, foldLine) 
            method getLines(firstRow, lastRow) 
            method addGutterDecoration(row, className) 
            method $updateInternalDataOnChange(e) 
            method getFoldLine(docRow, startFoldLine) 
            method highlight(re) 
            method setUndoManager(undoManager) 
            method highlightLines(startRow, endRow, clazz, inFront) 
            method getSelectionMarkers() 
            method redoChanges(deltas, dontSelect) 
            method removeFold(fold) 
            method duplicateLines(firstRow, lastRow) 
            method setDocument(doc) 
            method getTokens(row) 
            method $resetRowCache(docRow) 
            method setOption(name, value) 
            method onChange(e) 
            method setUseWorker(useWorker) 
            method getUseSoftTabs() 
            method getUseWorker() 
            method toggleFold(tryToUnfold) 
            method setScrollTop(scrollTop) 
            method moveLinesUp(firstRow, lastRow) 
            method isRowFolded(docRow, startFoldRow) 
            method setScrollLeft(scrollLeft) 
            method replace(range, text) 
            method $stopWorker() 
            method _dispatchEvent(eventName, e) 
            method onFoldWidgetClick(row, e) 
            method setWrapLimit(limit) 
            method setUseSoftTabs(val) 
            method getMode() 
            method setUndoSelect(enable) 
            method findMatchingBracket(position, chr) 
            method setMode(mode) 
            method getScrollLeft() 
            method addDynamicMarker(marker, inFront) 
            method removeFolds(folds) 
            method setFoldStyle(style) 
            method documentToScreenPosition(docRow, docColumn) 
            method insert(position, text) 
            method getScreenLength() 
            method screenToDocumentColumn(screenRow, screenColumn) 
            method $getRowCacheIndex(cacheArray, val) 
            method getUseWrapMode() 
            method getRowFoldStart(docRow, startFoldRow) 
            
            
        class FoldLine
            constructor new FoldLine (foldData, folds) 
            
            method shiftRow(shift) 
            method addFold(fold) 
            method containsRow(row) 
            method walk(callback, endRow, endColumn) 
            method getNextFoldTo(row, column) 
            method addRemoveChars(row, column, len) 
            method split(row, column) 
            method merge(foldLineNext) 
            method toString() 
            method idxToPosition(idx) 
            
            
        class FoldMode
            constructor new FoldMode () 
            
            properties
                foldingStartMarker:object
                foldingStopMarker:object
            method getFoldWidget(session, foldStyle, row) 
            method getFoldWidgetRange(session, foldStyle, row) 
            method indentationBlock(session, row, column) 
            method openingBracketBlock(session, bracket, row, column, typeRe) 
            method closingBracketBlock(session, bracket, row, column, typeRe) 
            
            
        class UndoManager
            constructor new UndoManager () 
            
            method execute(options) 
            method undo(dontSelect) 
            method redo(dontSelect) 
            method reset() 
            method hasUndo() 
            method hasRedo() 
            method markClean() 
            method isClean() 
            
            
        class UIWorkerClient
            constructor new UIWorkerClient (topLevelNamespaces, mod, classname) 
            
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method onError(e) 
            method onMessage(e) 
            method $normalizePath(path) 
            method terminate() 
            method send(cmd, args) 
            method call(cmd, args, callback) 
            method emit(event, data) 
            method attachToDocument(doc) 
            method changeListener(e) 
            method $sendDeltaQueue() 
            
            
        class WorkerClient
            constructor new WorkerClient (topLevelNamespaces, mod, classname) 
            
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method onError(e) 
            method onMessage(e) 
            method $normalizePath(path) 
            method terminate() 
            method send(cmd, args) 
            method call(cmd, args, callback) 
            method emit(event, data) 
            method attachToDocument(doc) 
            method changeListener(e) 
            method $sendDeltaQueue() 
            
            
        class HashHandler
            constructor new HashHandler (config, platform) 
            
            method addCommand(command) 
            method removeCommand(command) 
            method bindKey(key, command) 
            method addCommands(commands) 
            method removeCommands(commands) 
            method bindKeys(keyList) 
            method _buildKeyHash(command) 
            method parseKeys(keys) 
            method findKeyCommand(hashId, keyString) 
            method handleKeyboard(data, hashId, keyString, keyCode) 
            
            
        class DefaultHandlers
            constructor new DefaultHandlers (mouseHandler) 
            
            method onMouseDown(ev) 
            method startSelect(pos) 
            method select() 
            method extendSelectionBy(unitName) 
            method startDrag() 
            method focusWait() 
            method dragWait(e) 
            method dragWaitEnd(e) 
            method drag() 
            method dragEnd(e) 
            method onDoubleClick(ev) 
            method onTripleClick(ev) 
            method onQuadClick(ev) 
            method onMouseWheel(ev) 
            
            
        class BackgroundTokenizer
            constructor new BackgroundTokenizer (tokenizer, editor) 
            
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method setTokenizer(tokenizer) 
            method setDocument(doc) 
            method fireUpdateEvent(firstRow, lastRow) 
            method start(startRow) 
            method $updateOnChange(delta) 
            method stop() 
            method getTokens(row) 
            method getState(row) 
            method $tokenizeRow(row) 
            
            
        class Mode
            constructor new Mode () 
            
            properties
                lineCommentStart:string

                blockComment:
                    start:string
                    end:string
            method getNextLineIndent(state, line, tab) 
            method checkOutdent(state, line, input) 
            method autoOutdent(state, doc, row) 
            method createWorker(session) 
            
            
        class KeyBinding
            constructor new KeyBinding (editor) 
            
            method setDefaultHandler(kb) 
            method setKeyboardHandler(kb) 
            method addKeyboardHandler(kb, pos) 
            method removeKeyboardHandler(kb) 
            method getKeyboardHandler() 
            method $callKeyboardHandlers(hashId, keyString, keyCode, e) 
            method onCommandKey(e, hashId, keyCode) 
            method onTextInput(text) 
            
            
        class RangeList
            constructor new RangeList () 
            
            method comparePoints(p1, p2) 
            method pointIndex(pos, excludeEdges, startIndex) 
            method add(range) 
            method addList(list) 
            method substractPoint(pos) 
            method merge() 
            method contains(row, column) 
            method containsPoint(pos) 
            method rangeAtPoint(pos) 
            method clipRows(startRow, endRow) 
            method removeAll() 
            method attach(session) 
            method detach() 
            method $onChange(e) 
            
            
        class TextHighlightRules
            constructor new TextHighlightRules () 
            
            method addRules(rules, prefix) 
            method getRules() 
            method embedRules(HighlightRules, prefix, escapeRules, states, append) 
            method getEmbeds() 
            method normalizeRules() 
            method createKeywordMapper(map, defaultToken, ignoreCase, splitChar) 
            method getKeywords() 
            
            
        class Marker
            constructor new Marker (parentEl) 
            
            properties
                $padding:number
            method setPadding(padding) 
            method setSession(session) 
            method setMarkers(markers) 
            method update(config) 
            method $getTop(row, layerConfig) 
            method drawTextMarker(stringBuilder, range, clazz, layerConfig, extraStyle) 
            method drawMultiLineMarker(stringBuilder, range, clazz, config, extraStyle) 
            method drawSingleLineMarker(stringBuilder, range, clazz, config, extraLength, extraStyle) 
            method drawFullLineMarker(stringBuilder, range, clazz, config, extraStyle) 
            method drawScreenLineMarker(stringBuilder, range, clazz, config, extraStyle) 
            
            
        class Text
            constructor new Text (parentEl) 
            
            properties
                EOF_CHAR:string
                EOL_CHAR:string
                TAB_CHAR:string
                SPACE_CHAR:string
                $padding:number

                $fontStyles:
                    fontFamily:number
                    fontSize:number
                    fontWeight:number
                    fontStyle:number
                    lineHeight:number

                showInvisibles:boolean
                displayIndentGuides:boolean

                $tabStrings:
                    length:number

                $textToken:
                    text:boolean
                    rparen:boolean
                    lparen:boolean
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method setPadding(padding) 
            method getLineHeight() 
            method getCharacterWidth() 
            method checkForSizeChanges() 
            method $pollSizeChanges() 
            method $measureSizes() 
            method setSession(session) 
            method setShowInvisibles(showInvisibles) 
            method setDisplayIndentGuides(display) 
            method $computeTabString() 
            method onChangeTabSize() 
            method updateLines(config, firstRow, lastRow) 
            method scrollLines(config) 
            method $renderLinesFragment(config, firstRow, lastRow) 
            method update(config) 
            method $renderToken(stringBuilder, screenColumn, token, value) 
            method renderIndentGuide(stringBuilder, value) 
            method $renderWrappedLine(stringBuilder, tokens, splits, onlyContents) 
            method $renderSimpleLine(stringBuilder, tokens) 
            method $renderLine(stringBuilder, row, onlyContents, foldLine) 
            method $getFoldLineTokens(row, foldLine) 
            method $useLineGroups() 
            method destroy() 
            
            
        class Selection
            constructor new Selection (session) 
            
            properties
                ranges:object
                rangeList:object
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method isEmpty() 
            method isMultiLine() 
            method getCursor() 
            method setSelectionAnchor(row, column) 
            method getSelectionAnchor() 
            method getSelectionLead() 
            method shiftSelection(columns) 
            method isBackwards() 
            method getRange() 
            method clearSelection() 
            method selectAll() 
            method setSelectionRange(range, reverse) 
            method setRange(range, reverse) 
            method $moveSelection(mover) 
            method selectTo(row, column) 
            method selectToPosition(pos) 
            method selectUp() 
            method selectDown() 
            method selectRight() 
            method selectLeft() 
            method selectLineStart() 
            method selectLineEnd() 
            method selectFileEnd() 
            method selectFileStart() 
            method selectWordRight() 
            method selectWordLeft() 
            method getWordRange(row, column) 
            method selectWord() 
            method selectAWord() 
            method getLineRange(row, excludeLastChar) 
            method selectLine() 
            method moveCursorUp() 
            method moveCursorDown() 
            method moveCursorLeft() 
            method moveCursorRight() 
            method moveCursorLineStart() 
            method moveCursorLineEnd() 
            method moveCursorFileEnd() 
            method moveCursorFileStart() 
            method moveCursorLongWordRight() 
            method moveCursorLongWordLeft() 
            method $shortWordEndIndex(rightOfCursor) 
            method moveCursorShortWordRight() 
            method moveCursorShortWordLeft() 
            method moveCursorWordRight() 
            method moveCursorWordLeft() 
            method moveCursorBy(rows, chars) 
            method moveCursorToPosition(position) 
            method moveCursorTo(row, column, keepDesiredColumn) 
            method moveCursorToScreen(row, column, keepDesiredColumn) 
            method detach() 
            method fromOrientedRange(range) 
            method toOrientedRange(range) 
            method addRange(range, $blockChangeEvents) 
            method toSingleRange(range) 
            method substractPoint(pos) 
            method mergeOverlappingRanges() 
            method $onAddRange(range) 
            method $onRemoveRange(removed) 
            method $initRangeList() 
            method getAllRanges() 
            method splitIntoLines() 
            method toggleBlockSelection() 
            method rectangularRangeBlock(screenCursor, screenAnchor, includeEmptyLines) 
            
            
        class Gutter
            constructor new Gutter (parentEl) 
            
            properties
                $showFoldWidgets:boolean
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method setSession(session) 
            method addGutterDecoration(row, className)
            method removeGutterDecoration(row, className)
            method setAnnotations(annotations) 
            method $updateAnnotations(e) 
            method update(config) 
            method setShowFoldWidgets(show) 
            method getShowFoldWidgets() 
            method $computePadding() 
            method getRegion(point) 
            
            
        class Behaviour
            constructor new Behaviour () 
            
            method add(name, action, callback) 
            method addBehaviours(behaviours) 
            method remove(name) 
            method inherit(mode, filter) 
            method getBehaviours(filter) 
            
            
        class VirtualRenderer
            constructor new VirtualRenderer (container, theme) 
            
            properties
                $padding:object
                STEPS:number
                CHANGE_FULL:number
                $highlightGutterLine:boolean
                CHANGE_MARKER:number
                $printMarginColumn:number
                $showInvisibles:boolean
                $fontSize:number
                CHANGE_CURSOR:number
                CHANGE_MARKER_BACK:number
                CHANGE_H_SCROLL:number
                $showPrintMargin:boolean
                CHANGE_LINES:number
                $showGutter:boolean
                $animatedScroll:boolean
                CHANGE_SIZE:number
                CHANGE_MARKER_FRONT:number
                $displayIndentGuides:boolean
                CHANGE_TEXT:number
                $hScrollBarAlwaysVisible:boolean
                CHANGE_SCROLL:number
                $showFoldWidgets:boolean
                CHANGE_GUTTER:number

                $options:
                    animatedScroll:
                        initialValue:boolean
                        name:string


                    showInvisibles:
                        set:function(value) 
                        initialValue:boolean
                        name:string


                    showPrintMargin:
                        set:function() 
                        initialValue:boolean
                        name:string


                    printMarginColumn:
                        set:function() 
                        initialValue:number
                        name:string


                    printMargin:
                        set:function(val) 
                        get:function() 
                        name:string


                    showGutter:
                        set:function(show)
                        initialValue:boolean
                        name:string


                    fadeFoldWidgets:
                        set:function(show) 
                        initialValue:boolean
                        name:string


                    showFoldWidgets:
                        set:function(show) 
                        initialValue:boolean
                        name:string


                    displayIndentGuides:
                        set:function(show) 
                        initialValue:boolean
                        name:string


                    highlightGutterLine:
                        set:function(shouldHighlight) 
                        initialValue:boolean
                        value:boolean
                        name:string


                    hScrollBarAlwaysVisible:
                        set:function(alwaysVisible) 
                        initialValue:boolean
                        name:string


                    fontSize:
                        set:function(size) 
                        initialValue:number
                        name:string


                    fontFamily:
                        set:function(name) 
                        name:string

                $fadeFoldWidgets:boolean
            method _signal(eventName, e) 
            method updateCharacterSize() 
            method alignCursor(cursor, alignment) 
            method getShowGutter()
            method isScrollableBy(deltaX, deltaY) 
            method scrollBy(deltaX, deltaY) 
            method getPrintMarginColumn() 
            method setAnimatedScroll(shouldAnimate)
            method getShowPrintMargin() 
            method $updateGutterLineHighlight() 
            method _emit(eventName, e) 
            method setCompositionText(text) 
            method getLastVisibleRow() 
            method getContainerElement() 
            method destroy() 
            method getHScrollBarAlwaysVisible() 
            method onChangeTabSize() 
            method getFirstFullyVisibleRow() 
            method getScrollBottomRow() 
            method getScrollTop() 
            method onResize(force, gutterWidth, width, height) 
            method screenToTextCoordinates(x, y) 
            method updateText() 
            method showComposition(position) 
            method scrollCursorIntoView(cursor, offset) 
            method $getLongestLine() 
            method updateFull(force) 
            method off(eventName, callback) 
            method scrollToY(scrollTop) 
            method removeGutterDecoration(row, className)
            method adjustWrapLimit() 
            method getOption(name) 
            method $calcSteps(fromValue, toValue)
            method addGutterDecoration(row, className)
            method getLastFullyVisibleRow() 
            method getTheme() 
            method setOptions(optList) 
            method setAnnotations(annotations) 
            method visualizeBlur() 
            method hideComposition() 
            method unsetStyle(style) 
            method $updatePrintMargin() 
            method updateBackMarkers() 
            method removeAllListeners(eventName) 
            method hideCursor() 
            method setStyle(style, include) 
            method getMouseEventTarget() 
            method $updateLines() 
            method getOptions(optionNames) 
            method setOption(name, value) 
            method getShowInvisibles() 
            method setFadeFoldWidgets(show) 
            method scrollToLine(line, center, animate, callback) 
            method getFirstVisibleRow() 
            method scrollToRow(row) 
            method setShowInvisibles(showInvisibles) 
            method setTheme(theme) 
            method on(eventName, callback, capturing) 
            method showCursor() 
            method addEventListener(eventName, callback, capturing) 
            method setDisplayIndentGuides(display) 
            method removeListener(eventName, callback) 
            method setHighlightGutterLine(shouldHighlight) 
            method visualizeFocus() 
            method _dispatchEvent(eventName, e) 
            method getFadeFoldWidgets()
            method updateFontSize() 
            method removeDefaultHandler(eventName, callback) 
            method getAnimatedScroll() 
            method removeEventListener(eventName, callback) 
            method getTextAreaContainer() 
            method scrollToX(scrollLeft) 
            method $renderChanges(changes, force) 
            method getScrollTopRow() 
            method pixelToScreenCoordinates(x, y) 
            method setSession(session) 
            method getDisplayIndentGuides() 
            method updateLines(firstRow, lastRow) 
            method setShowGutter(show)
            method getScrollLeft() 
            method $moveTextAreaToCursor() 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method $updateScrollBar() 
            method updateCursor() 
            method updateBreakpoints(rows) 
            method setPadding(padding) 
            method setShowPrintMargin(showPrintMargin) 
            method setHScrollBarAlwaysVisible(alwaysVisible) 
            method textToScreenCoordinates(row, column) 
            method scrollSelectionIntoView(anchor, lead, offset) 
            method setPrintMarginColumn(showPrintMargin) 
            method animateScrolling(fromValue, callback) 
            method $computeLayerConfig() 
            method onGutterResize() 
            method updateFrontMarkers() 
            method getHighlightGutterLine() 
            
            
        class MouseHandler
            constructor new MouseHandler (editor) 
            
            properties
                $options:
                    scrollSpeed:
                        initialValue:number
                        name:string


                    dragDelay:
                        initialValue:number
                        name:string


                    focusTimout:
                        initialValue:number
                        name:string

                $scrollSpeed:number
                $dragDelay:number
                $focusTimout:number
            method onMouseEvent(name, e) 
            method onMouseMove(name, e) 
            method onMouseWheel(name, e) 
            method setState(state) 
            method captureMouse(ev, state) 
            method setOptions(optList) 
            method getOptions(optionNames) 
            method setOption(name, value) 
            method getOption(name) 
            
            
        class PlaceHolder
            constructor new PlaceHolder (session, length, pos, others, mainClass, othersClass) 
            
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method setup() 
            method showOtherMarkers() 
            method hideOtherMarkers() 
            method onUpdate(event) 
            method onCursorChange(event) 
            method detach() 
            method cancel() 
            
            
        class Tokenizer
            constructor new Tokenizer (rules) 
            
            method $applyToken(str) 
            method $arrayTokens(str) 
            method removeCapturingGroups(src) 
            method createSplitterRegexp(src, flag) 
            method getLineTokens(line, startState) 
            
            
        class Document
            constructor new Document (text) 
            
            properties
                $autoNewLine:string
                $newLineMode:string
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method setValue(text) 
            method getValue() 
            method createAnchor(row, column) 
            method $split(text) 
            method $detectNewLine(text) 
            method getNewLineCharacter() 
            method setNewLineMode(newLineMode) 
            method getNewLineMode() 
            method isNewLine(text) 
            method getLine(row) 
            method getLines(firstRow, lastRow) 
            method getAllLines() 
            method getLength() 
            method getTextRange(range) 
            method $clipPosition(position) 
            method insert(position, text) 
            method insertLines(row, lines) 
            method _insertLines(row, lines) 
            method insertNewLine(position) 
            method insertInLine(position, text) 
            method remove(range) 
            method removeInLine(row, startColumn, endColumn) 
            method removeLines(firstRow, lastRow) 
            method _removeLines(firstRow, lastRow) 
            method removeNewLine(row) 
            method replace(range, text) 
            method applyDeltas(deltas) 
            method revertDeltas(deltas) 
            method indexToPosition(index, startRow) 
            method positionToIndex(pos, startRow) 
            
            
        class Editor
            constructor new Editor (renderer, session) 
            
            properties

                session: EditSession

                $options:
                    useSoftTabs:
                        forwardTo:string
                        name:string


                    fontFamily:
                        forwardTo:string
                        name:string


                    foldStyle:
                        forwardTo:string
                        name:string


                    fadeFoldWidgets:
                        forwardTo:string
                        name:string


                    readOnly:
                        set:function(readOnly) 
                        initialValue:boolean
                        name:string


                    highlightGutterLine:
                        forwardTo:string
                        name:string


                    tabSize:
                        forwardTo:string
                        name:string


                    displayIndentGuides:
                        forwardTo:string
                        name:string


                    overwrite:
                        forwardTo:string
                        name:string


                    scrollSpeed:
                        forwardTo:string
                        name:string


                    showPrintMargin:
                        forwardTo:string
                        name:string


                    behavioursEnabled:
                        initialValue:boolean
                        name:string


                    hScrollBarAlwaysVisible:
                        forwardTo:string
                        name:string


                    printMarginColumn:
                        forwardTo:string
                        name:string


                    fontSize:
                        forwardTo:string
                        name:string


                    newLineMode:
                        forwardTo:string
                        name:string


                    wrap:
                        forwardTo:string
                        name:string


                    animatedScroll:
                        forwardTo:string
                        name:string


                    firstLineNumber:
                        forwardTo:string
                        name:string


                    cursorStyle:
                        set:function(val) 



                        values:
                            length:number



                        initialValue:string
                        name:string


                    dragDelay:
                        forwardTo:string
                        name:string


                    showInvisibles:
                        forwardTo:string
                        name:string


                    useWorker:
                        forwardTo:string
                        name:string


                    focusTimout:
                        forwardTo:string
                        name:string


                    selectionStyle:
                        set:function(style) 
                        initialValue:string
                        name:string


                    wrapBehavioursEnabled:
                        initialValue:boolean
                        name:string


                    highlightActiveLine:
                        set:function() 
                        initialValue:boolean
                        name:string


                    showFoldWidgets:
                        forwardTo:string
                        name:string


                    highlightSelectedWord:
                        set:function(shouldHighlight) 
                        initialValue:boolean
                        name:string


                    printMargin:
                        forwardTo:string
                        name:string


                    showGutter:
                        forwardTo:string
                        name:string

                $selectionStyle:string
                $highlightActiveLine:boolean
                $highlightSelectedWord:boolean
                $readOnly:boolean
                $cursorStyle:string
                $behavioursEnabled:boolean
                $wrapBehavioursEnabled:boolean
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method setKeyboardHandler(keyboardHandler) 
            method getKeyboardHandler() 
            method setSession(session) 
            method getSession() returns EditSession

            method setValue(val, cursorPos) 
            method getValue() 
            method getSelection() 
            method resize(force) 
            method setTheme(theme) 
            method getTheme() 
            method setStyle(style) 
            method unsetStyle(style) 
            method getFontSize() 
            method setFontSize(size) 
            method $highlightBrackets() 
            method focus() 
            method isFocused() 
            method blur() 
            method onFocus() 
            method onBlur() 
            method $cursorChange() 
            method onDocumentChange(e) 
            method onTokenizerUpdate(e) 
            method onScrollTopChange() 
            method onScrollLeftChange() 
            method onCursorChange() 
            method $updateHighlightActiveLine() 
            method onSelectionChange(e) 
            method $getSelectionHighLightRegexp() 
            method onChangeFrontMarker() 
            method onChangeBackMarker() 
            method onChangeBreakpoint() 
            method onChangeAnnotation() 
            method onChangeMode(e) 
            method onChangeWrapLimit() 
            method onChangeWrapMode() 
            method onChangeFold() 
            method getCopyText() 
            method onCopy() 
            method onCut() 
            method onPaste(text) 
            method execCommand(command, args) 
            method insert(text) 
            method onTextInput(text) 
            method onCommandKey(e, hashId, keyCode) 
            method setOverwrite(overwrite) 
            method getOverwrite() 
            method toggleOverwrite() 
            method setScrollSpeed(speed) 
            method getScrollSpeed() 
            method setDragDelay(dragDelay) 
            method getDragDelay() 
            method setSelectionStyle(val) 
            method getSelectionStyle() 
            method setHighlightActiveLine(shouldHighlight) 
            method getHighlightActiveLine() 
            method setHighlightGutterLine(shouldHighlight) 
            method getHighlightGutterLine() 
            method setHighlightSelectedWord(shouldHighlight) 
            method getHighlightSelectedWord() 
            method setAnimatedScroll(shouldAnimate)
            method getAnimatedScroll()
            method setShowInvisibles(showInvisibles) 
            method getShowInvisibles() 
            method setDisplayIndentGuides(display) 
            method getDisplayIndentGuides() 
            method setShowPrintMargin(showPrintMargin) 
            method getShowPrintMargin() 
            method setPrintMarginColumn(showPrintMargin) 
            method getPrintMarginColumn() 
            method setReadOnly(readOnly) 
            method getReadOnly() 
            method setBehavioursEnabled(enabled) 
            method getBehavioursEnabled() 
            method setWrapBehavioursEnabled(enabled) 
            method getWrapBehavioursEnabled() 
            method setShowFoldWidgets(show) 
            method getShowFoldWidgets() 
            method setFadeFoldWidgets(fade) 
            method getFadeFoldWidgets() 
            method remove(dir) 
            method removeWordRight() 
            method removeWordLeft() 
            method removeToLineStart() 
            method removeToLineEnd() 
            method splitLine() 
            method transposeLetters() 
            method toLowerCase() 
            method toUpperCase() 
            method indent() 
            method blockIndent() 
            method blockOutdent() 
            method sortLines() 
            method toggleCommentLines() 
            method toggleBlockComment() 
            method getNumberAt( row, column ) 
            method modifyNumber(amount) 
            method removeLines() 
            method duplicateSelection() 
            method moveLinesDown() 
            method moveLinesUp() 
            method moveText(range, toPosition) 
            method copyLinesUp() 
            method copyLinesDown() 
            method $moveLines(mover) 
            method $getSelectedRows() 
            method onCompositionStart(text) 
            method onCompositionUpdate(text) 
            method onCompositionEnd() 
            method getFirstVisibleRow() 
            method getLastVisibleRow() 
            method isRowVisible(row) 
            method isRowFullyVisible(row) 
            method $getVisibleRowCount() 
            method $moveByPage(dir, select) 
            method selectPageDown() 
            method selectPageUp() 
            method gotoPageDown() 
            method gotoPageUp() 
            method scrollPageDown() 
            method scrollPageUp() 
            method scrollToRow(row) 
            method scrollToLine(line, center, animate, callback) 
            method centerSelection() 
            method getCursorPosition() 
            method getCursorPositionScreen() 
            method getSelectionRange() 
            method selectAll() 
            method clearSelection() 
            method moveCursorTo(row, column) 
            method moveCursorToPosition(pos) 
            method jumpToMatching(select) 
            method gotoLine(lineNumber, column, animate) 
            method navigateTo(row, column) 
            method navigateUp(times) 
            method navigateDown(times) 
            method navigateLeft(times) 
            method navigateRight(times) 
            method navigateLineStart() 
            method navigateLineEnd() 
            method navigateFileEnd() 
            method navigateFileStart() 
            method navigateWordRight() 
            method navigateWordLeft() 
            method replace(replacement, options) 
            method replaceAll(replacement, options) 
            method $tryReplace(range, replacement) 
            method getLastSearchOptions() 
            method find(needle, options, animate) 
            method findNext(options, animate) 
            method findPrevious(options, animate) 
            method revealRange(range, animate) 
            method undo() 
            method redo() 
            method destroy() 
            method setAutoScrollEditorIntoView(enable) 
            method $resetCursorStyle() 
            method setOptions(optList) 
            method getOptions(optionNames) 
            method setOption(name, value) 
            method getOption(name) 
            method updateSelectionMarkers() 
            method addSelectionMarker(orientedRange) 
            method removeSelectionMarker(range) 
            method removeSelectionMarkers(ranges) 
            method $onAddRange(e) 
            method $onRemoveRange(e) 
            method $onMultiSelect(e) 
            method $onSingleSelect(e) 
            method $onMultiSelectExec(e) 
            method forEachSelection(cmd, args, $byLines) 
            method exitMultiSelectMode() 
            method findAll(needle, options, additive) 
            method selectMoreLines(dir, skip) 
            method transposeSelections(dir) 
            method selectMore(dir, skip) 
            method alignCursors() 
            method $reAlignText(lines) 
            
            
        class MouseEvent
            constructor new MouseEvent (domEvent, editor) 
            
            method stopPropagation() 
            method preventDefault() 
            method stop() 
            method getDocumentPosition() 
            method inSelection() 
            method getButton() 
            method getShiftKey() 
            method getAccelKey() 
            
            
        class Cursor
            constructor new Cursor (parentEl) 
            
            properties
                $padding:number
            method setPadding(padding) 
            method setSession(session) 
            method setBlinking(blinking) 
            method setBlinkInterval(blinkInterval) 
            method setSmoothBlinking(smoothBlinking) 
            method addCursor() 
            method removeCursor() 
            method hideCursor() 
            method showCursor() 
            method restartTimer() 
            method getPixelPosition(position, onScreen) 
            method update(config) 
            method $setOverwrite(overwrite) 
            method destroy() 
            
            
        class Range
            constructor new Range (startRow, startColumn, endRow, endColumn) 
            
            method isEqual(range) 
            method toString() 
            method contains(row, column) 
            method compareRange(range) 
            method comparePoint(p) 
            method containsRange(range) 
            method intersects(range) 
            method isEnd(row, column) 
            method isStart(row, column) 
            method setStart(row, column) 
            method setEnd(row, column) 
            method inside(row, column) 
            method insideStart(row, column) 
            method insideEnd(row, column) 
            method compare(row, column) 
            method compareStart(row, column) 
            method compareEnd(row, column) 
            method compareInside(row, column) 
            method clipRows(firstRow, lastRow) 
            method extend(row, column) 
            method isEmpty() 
            method isMultiLine() 
            method clone() 
            method collapseRows() 
            method toScreenRange(session) 
            method moveBy(row, column) 
            
        
        append to namespace Range
            method fromPoints(start, end) 
            method comparePoints(p1, p2) 
            
        class Search
            constructor new Search () 
            
            method set(options) 
            method getOptions() 
            method setOptions(options) 
            method find(session) 
            method findAll(session) 
            method replace(input, replacement) 
            method $matchIterator(session, options) 
            method $assembleRegExp(options) 
            method $assembleMultilineRegExp(needle, modifier) 
            method $lineIterator(session, options) 
            
            
        class CommandManager
            constructor new CommandManager (platform, commands) 
            
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method exec(command, editor, args) 
            method toggleRecording(editor) 
            method replay(editor) 
            method trimMacro(m) 
            
            
        class Anchor
            constructor new Anchor (doc, row, column) 
            
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method getPosition() 
            method getDocument() 
            method onChange(e) 
            method setPosition(row, column, noClip) 
            method detach() 
            method $clipPositionToDocument(row, column) 
            
            
        class ScrollBar
            constructor new ScrollBar (parent) 
            
            method _dispatchEvent(eventName, e) 
            method _emit(eventName, e) 
            method _signal(eventName, e) 
            method once(eventName, callback) 
            method setDefaultHandler(eventName, callback) 
            method removeDefaultHandler(eventName, callback) 
            method addEventListener(eventName, callback, capturing) 
            method on(eventName, callback, capturing) 
            method removeEventListener(eventName, callback) 
            method removeListener(eventName, callback) 
            method off(eventName, callback) 
            method removeAllListeners(eventName) 
            method onScroll() 
            method getWidth() 
            method setHeight(height) 
            method setInnerHeight(height) 
            method setScrollTop(scrollTop) 
            
    end namespace ace
    