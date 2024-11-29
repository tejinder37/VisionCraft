import {
  ActiveTool,
  Editor,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  STROKE_COLOR,
} from "../types";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TbColorFilter } from "react-icons/tb";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import {
  ALargeSmall,
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  BoldIcon,
  CaseSensitive,
  Copy,
  LetterText,
  LucideItalic,
  SquareSplitHorizontal,
  Strikethrough,
  Trash,
  Underline,
} from "lucide-react";
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { useState } from "react";
import { FontSizeInput } from "./font-size-input";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor() || FILL_COLOR;
  const initialStrokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const intialFontFamily = editor?.getActiveFontFamily() || FONT_FAMILY;
  const initalFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initalFontStyle = editor?.getActiveFontStyle() || "normal";
  const initalFontSize = editor?.getActiveFontSize() || FONT_SIZE;
  const initalFontLineThrough = editor?.getActiveFontLinethrough();
  const initalFontUnderline = editor?.getActiveFontUnderline();
  const initalTextAlign = editor?.getActiveTextAlign();
  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: intialFontFamily,
    fontWeight: initalFontWeight,
    fontStyle: initalFontStyle,
    fontLineThrough: initalFontLineThrough,
    fontUnderline: initalFontUnderline,
    textAlign: initalTextAlign,
    fontSize: initalFontSize,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) return;
    editor.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };
  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) return;
    editor.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };
  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }
    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;
    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";
    editor.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };
  const toggleLineThrough = () => {
    if (!selectedObject) return;
    const newValue = properties.fontLineThrough ? false : true;
    editor.changeFontLinethrough(newValue);
    setProperties((current) => ({
      ...current,
      fontLineThrough: newValue,
    }));
  };
  const toggleUnderline = () => {
    if (!selectedObject) return;
    const newValue = properties.fontUnderline ? false : true;
    editor.changeFontUnderline(newValue);
    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }));
  };
  if (editor?.selectedObjects.length === 0) {
    return (
      <div
        className="shrink-0 h-[56px] border-b bg-white w-full hidden

     items-center overflow-x-auto z-[49] p-2 gap-x-2"
      />
    );
  }
  return (
    <div
      className="shrink-0 min-h-[46px] border-b bg-white min-w-300px absolute left-1 top-1/2 -translate-y-1/2 gap-y-2 flex flex-col rounded-xl
     items-center z-[49] p-2 gap-x-2"
    >
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Color" side="bottom" sideOffset={5} >
            <Button
              onClick={() => {
                onChangeActiveTool("fill");
              }}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              ></div>
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke color" side="bottom" sideOffset={5} >
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-color");
              }}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor,
                }}
              ></div>
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke width" side="bottom" sideOffset={5} >
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-width");
              }}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth strokeWidth={1.7}  className="size-4 text-black" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="bottom" sideOffset={5} >
            <Button
              onClick={() => {
                onChangeActiveTool("font");
              }}
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
              <CaseSensitive strokeWidth={1.7} />
              </div>              {/* <ChevronDown className="size-4 ml-2 shrink-0" /> */}
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5} >
            <Button
              onClick={toggleBold}
              size="icon"
              variant="ghost"
              className={cn(properties?.fontWeight > 500 && "bg-gray-100")}
            >
              <BoldIcon strokeWidth={1.7}  className="size-4 text-black" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5} >
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(
                properties?.fontStyle === "italic" && "bg-gray-100"
              )}
            >
              <LucideItalic strokeWidth={1.7}  className="size-4 text-black" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5} >
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(properties?.fontUnderline && "bg-gray-100")}
            >
              <Underline strokeWidth={1.7}  className="size-4 text-black" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Strike" side="bottom" sideOffset={5} >
            <Button
              onClick={toggleLineThrough}
              size="icon"
              variant="ghost"
              className={cn(properties?.fontLineThrough && "bg-gray-100")}
            >
              <Strikethrough strokeWidth={1.7}  className="size-4 text-black" />
            </Button>
          </Hint>
        </div>
      )}  {isText && (
        <div className="flex items-center h-full justify-center relative group">
          <Hint label="Align" side="bottom" sideOffset={5}  >
            <div>
              <h4 className="text-[1rem]">
                <LetterText strokeWidth={1.7}  />
              </h4>
              <div className="absolute top-0 left-[20px] overflow-hidden h-0 group-hover:h-auto hover:h-auto bg-white px-1 flex justify-center items-center gap-2">
                <Hint label="Align left" side="bottom" sideOffset={5} >
                  <Button
                    onClick={() => onChangeTextAlign("left")}
                    size="icon"
                    variant="ghost"
                    className={cn(properties?.textAlign == "left" && "bg-gray-100")}
                  >
                    <AlignLeft className="size-4 text-black" />
                  </Button>
                </Hint>
                <Hint label="Align center" side="bottom" sideOffset={5} >
                  <Button
                    onClick={() => onChangeTextAlign("center")}
                    size="icon"
                    variant="ghost"
                    className={cn(properties?.textAlign == "center" && "bg-gray-100")}
                  >
                    <AlignCenter className="size-4 text-black" />
                  </Button>
                </Hint>
                <Hint label="Align right" side="bottom" sideOffset={5} >
                  <Button
                    onClick={() => onChangeTextAlign("right")}
                    size="icon"
                    variant="ghost"
                    className={cn(properties?.textAlign == "right" && "bg-gray-100")}
                  >
                    <AlignRight className="size-4 text-black" />
                  </Button>
                </Hint>
              </div>
            </div>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center relative group">

          <Hint label="Size" side="bottom" sideOffset={5}  >
            <div>
              <h4 className="text-[1rem]">
                <ALargeSmall  strokeWidth={1.7} />
              </h4>
              <div className="absolute top-0 left-[20px] overflow-hidden h-0 group-hover:h-[40px] hover:h-[40px]">
                <FontSizeInput
                  value={properties.fontSize}
                  onChange={onChangeFontSize}
                />
              </div>

            </div>
          </Hint>


        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Filters" side="bottom" sideOffset={5} >
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "filter" && "bg-gray-100")}
            >
              <TbColorFilter strokeWidth={1.7}  className="size-4 text-black" />
            </Button>
          </Hint>
        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Remove background" side="bottom" sideOffset={5} >
            <Button
              onClick={() => onChangeActiveTool("remove-bg")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "remove-bg" && "bg-gray-100")}
            >
              <SquareSplitHorizontal strokeWidth={1.7}  className="size-4 text-black" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bring forward" side="bottom" sideOffset={5} >
          <Button
            onClick={() => {
              editor?.bringForward();
            }}
            size="icon"
            variant="ghost"
          >
            <ArrowUp strokeWidth={1.7}  className="size-4 text-black" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="send backwards" side="bottom" sideOffset={5} >
          <Button
            onClick={() => {
              editor?.sendBackwards();
            }}
            size="icon"
            variant="ghost"
          >
            <ArrowDown strokeWidth={1.7}  className="size-4 text-black" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5} >
          <Button
            onClick={() => {
              onChangeActiveTool("opacity");
            }}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid strokeWidth={1.7}  className="size-4 text-black" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5} >
          <Button
            onClick={() => {
              editor?.delete();
            }}
            size="icon"
            variant="ghost"
          >
            <Trash strokeWidth={1.7}  className="size-4 text-black" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Duplicate" side="bottom" sideOffset={5} >
          <Button
            onClick={() => {
              editor?.onCopy();
              editor?.onPaste();
            }}
            size="icon"
            variant="ghost"
          >
            <Copy strokeWidth={1.7}  className="size-4 text-black" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
