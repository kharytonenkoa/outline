"use client"

import Link from "next/link";
import React, { useState } from "react";
import { WidthProvider, Responsive, Layout, Layouts } from "react-grid-layout";
import PublicationItem from "./PublicationItem";
import { Publication } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";


const Panel = React.forwardRef(
  (props: React.HTMLProps<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => {
    const { style, ...otherProps } = props;

    const styles = {
      ...style,
      border: "1px solid black"
    };

    return (
      <div ref={ref} style={styles} {...otherProps}>
        {props.children}
      </div>
    );
  }
);

const ResponsiveReactGridLayout = WidthProvider(Responsive);

type ReactGridLayoutProps = {

  cols: { [breakpoint: string]: number };
  rowHeight: number;
  publications: Publication[];
  classname?: string;
  useCSSTransforms?: boolean;
  isBounded?: boolean;

  savedLayouts?: { [breakpoint: string]: Layout[] };
  defaultPanelHeight?: number;
  defaultPanelWidth?: number;
};

const ReactGridLayout = ({
  savedLayouts,
  defaultPanelHeight,
  defaultPanelWidth,
  publications,
  ...props
}: ReactGridLayoutProps) => {
  type GridStateProps = {
    currentBreakpoint: string;
    currentCols: number;
    layouts: { [breakpoint: string]: Layout[] };
    currentLayout: Layout[];
  };

  const initialState: GridStateProps = {
    currentBreakpoint: "lg",
    currentCols: props.cols.lg,
    layouts: savedLayouts || {},

    // @todo merge hacky way
    currentLayout: savedLayouts
      ? savedLayouts["lg"] ||
        savedLayouts["md"] ||
        savedLayouts["sm"] ||
        savedLayouts["xs"] ||
        savedLayouts["xss"] ||
        []
      : []
  };

  const [state, setState] = useState(initialState);

  const handleLayoutChange = (
    newLayout: Layout[],
    newLayoutWithBreakpoint: Layouts
  ) => {
    setState({
      ...state,
      layouts: newLayoutWithBreakpoint
    });
  };

  const findClosestToTopLeftSpaceAvailable = () => {
    // @todo

    return {
      x: 0,
      y: Infinity
    };
  };

  const addItemHandler = () => {
    const newPanelPositionXY = findClosestToTopLeftSpaceAvailable();

    const newPanel: Layout = {
      i: state.currentLayout.length.toString(),
      x: newPanelPositionXY.x,
      y: newPanelPositionXY.y,
      w: defaultPanelWidth || 6,
      h: defaultPanelHeight || 2,
      minW: 1,
      minH: 1,
      maxW: undefined,
      maxH: undefined,
      isDraggable: true,
      isResizable: true,
      isBounded: false,
      resizeHandles: ["se"],
      static: false
    };

    const newLayout = [...state.currentLayout, newPanel];

    setState({
      ...state,
      layouts: { [state.currentBreakpoint]: newLayout },
      currentLayout: newLayout
    });
  };

  const breakpointChangeHandler = (newBreakpoint: string, newCols: number) => {
    // @todo merge hacky way
    const oldLayout =
      state.layouts[state.currentBreakpoint] ||
      state.layouts["lg"] ||
      state.layouts["md"] ||
      state.layouts["sm"] ||
      state.layouts["xs"] ||
      state.layouts["xxs"] ||
      [];

    setState({
      ...state,
      currentBreakpoint: newBreakpoint,
      currentCols: newCols,
      currentLayout: state.layouts[newBreakpoint] || oldLayout
    });
  };

  /*
   * THIS HANDLER ISN'T IMPORTANT FOR PROD
   * IT PROVIDES A WAY TO UPDATE PANELS TO DEBUG
   *
   * USEFUL TO HANDLE RESIZE & DRAG EVENTS
   */
  const updateLayout = (newLayout: Layout[]) => {
    setState({
      ...state,
      layouts: {
        ...state.layouts,
        [state.currentBreakpoint]: [...newLayout]
      },
      currentLayout: [...newLayout]
    });
  };

  const saveConfig = () => {
    if (window.localStorage) {
      console.log("saving layouts", state.layouts);
      window.localStorage.setItem(
        "gridLayoutConfig",
        JSON.stringify(state.layouts)
      );
    }
  };

  const deleteConfig = () => {
    if (window.localStorage) {
      console.log("deleting layouts");
      window.localStorage.removeItem("gridLayoutConfig");
    }
  };

  const onPlay = useOnPlay(publications);
  if (publications.length === 0) {
    return (
      <div className="z-0 text-sm font-regular bg-white/20 rounded-full px-2 py-1 flex flex-col justify-center items-center fixed top-[48%] left-[40%] select-none">
        <p>Press <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut> to navigate</p>
      </div>
    )
  }

  return (
    <div className="z-10">
      <ResponsiveReactGridLayout
        onLayoutChange={handleLayoutChange}
        onBreakpointChange={breakpointChangeHandler}
        layouts={state.layouts}
        onResizeStop={updateLayout}
        onDragStop={updateLayout}
        {...props}
      >
        {publications.map((item) => (
              <Link href={`/publication/${item.id}`} key={item.id}>
              <div key={item.id}>
                <PublicationItem
                  onClick={(id: string) => onPlay(id)} 
                  key={item.id} 
                  data={item}
                />
              </div>
              </Link>
            ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export { ReactGridLayout };
