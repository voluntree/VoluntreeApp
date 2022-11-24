import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";


//TabNavigator Icons

export function HomeIcon(width, height, fill) { 
 return (
    <Svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13.27 2.417a1.04 1.04 0 00-1.54 0L2.353 12.833a1.042 1.042 0 00.771 1.75h2.083v7.292a1.042 1.042 0 001.042 1.042h12.5a1.042 1.042 0 001.042-1.042v-7.292h2.083a1.041 1.041 0 001.042-1.041 1.042 1.042 0 00-.271-.709L13.27 2.417z"
        fill= {fill}
      />
    </Svg>
  );
}

export function NewsIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M7.688 14.938v-1.563H9.25v1.563H7.687zM3 7.125A3.125 3.125 0 016.125 4h10.938a3.125 3.125 0 013.125 3.125v10.156a.781.781 0 101.562 0V7.125a3.125 3.125 0 013.125 3.125v7.031a3.907 3.907 0 01-3.906 3.907H6.906A3.907 3.907 0 013 17.28V7.125zm3.906 1.563a.781.781 0 000 1.562h9.375a.781.781 0 100-1.563H6.906zm0 3.124a.781.781 0 00-.781.782v3.125a.781.781 0 00.781.781h3.125a.781.781 0 00.781-.781v-3.125a.781.781 0 00-.78-.781H6.905zm6.25 0a.781.781 0 100 1.563h3.125a.781.781 0 100-1.563h-3.125zm0 3.126a.781.781 0 100 1.562h3.125a.781.781 0 100-1.563h-3.125z"
          fill= {fill}
        />
      </Svg>
    );
  }

export function ShopIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M7.5 23.833c-.688 0-1.276-.212-1.765-.636-.49-.424-.735-.934-.735-1.53v-13c0-.596.245-1.106.735-1.53.49-.425 1.077-.637 1.765-.637H10c0-1.192.49-2.212 1.469-3.06.979-.849 2.156-1.273 3.531-1.273s2.552.424 3.531 1.273C19.511 4.288 20 5.308 20 6.5h2.5c.688 0 1.276.212 1.766.637.49.424.734.934.734 1.53v13c0 .595-.245 1.106-.734 1.53-.49.424-1.078.636-1.766.636h-15zm3.75-11.916c.354 0 .651-.104.891-.312a.98.98 0 00.359-.772V8.667H10v2.166c0 .307.12.564.36.772.24.208.536.312.89.312zM12.5 6.5h5c0-.596-.245-1.106-.734-1.53-.49-.424-1.078-.637-1.766-.637s-1.276.213-1.765.637c-.49.424-.735.934-.735 1.53zm6.25 5.417c.354 0 .651-.104.891-.312a.98.98 0 00.359-.772V8.667h-2.5v2.166c0 .307.12.564.36.772.24.208.536.312.89.312z"
          fill= {fill}
        />
      </Svg>
    );
  }

export function InboxIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M22.75 15.832a8.9 8.9 0 01-5.688 2.043c-.56 0-1.108-.052-1.638-.15-.526.618-1.3.962-2.424.962-1.458 0-2.327-.578-2.828-1.582a4.139 4.139 0 01-.37-1.167 3.408 3.408 0 01-.052-.5.812.812 0 00-.813-.813H4.875V8.937A2.437 2.437 0 017.313 6.5H8.46c.161-.567.374-1.11.639-1.625H7.313A4.062 4.062 0 003.25 8.938v11.374a4.062 4.062 0 004.063 4.063h11.375a4.062 4.062 0 004.062-4.063v-4.48zm-5.688.418a7.312 7.312 0 100-14.624 7.312 7.312 0 000 14.624zm-3.825-6.737a.814.814 0 011.15-1.15l1.863 1.863V5.687a.812.812 0 111.625 0v4.54l1.862-1.865a.814.814 0 011.15 1.15l-3.25 3.25a.811.811 0 01-.57.238h-.01a.81.81 0 01-.565-.234l-.005-.005-3.25-3.25v.002z"
          fill={fill}
        />
      </Svg>
    );
  }

export function ProfileIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M4.688 23.438h15.625V19.53a5.475 5.475 0 00-5.47-5.468h-4.687a5.475 5.475 0 00-5.469 5.468v3.907zM7.03 7.03a5.469 5.469 0 1010.938 0 5.469 5.469 0 00-10.938 0z"
          fill={fill}
        />
      </Svg>
    );
  }

  //Sort Icons

export function FAIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M21 16.5a.5.5 0 00.5.5h1.293a.5.5 0 01.353.854l-2.792 2.792a.5.5 0 01-.708 0l-2.792-2.792a.5.5 0 01.353-.854H18.5a.5.5 0 00.5-.5v-13a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v13zm-13-1a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2zM13 5h-.5a.5.5 0 01-.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1a.5.5 0 01-.5.5H3c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h10c1.11 0 2-.89 2-2V7c0-1.11-.89-2-2-2zM3.5 18a.5.5 0 01-.5-.5v-6a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v6a.5.5 0 01-.5.5h-9z"
          fill={fill}
        />
      </Svg>
    );
}

export function FDIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M19 7.5a.5.5 0 00-.5-.5h-1.293a.5.5 0 01-.353-.854l2.792-2.792a.5.5 0 01.708 0l2.792 2.792a.5.5 0 01-.353.854H21.5a.5.5 0 00-.5.5v13a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-13zm-11 8a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2zM13 5h-.5a.5.5 0 01-.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1a.5.5 0 01-.5.5H3c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h10c1.11 0 2-.89 2-2V7c0-1.11-.89-2-2-2zM3.5 18a.5.5 0 01-.5-.5v-6a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v6a.5.5 0 01-.5.5h-9z"
          fill={fill}
        />
      </Svg>
    );
}

export function AZIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G clipPath="url(#prefix__clip0_102_16)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.759 13c.94 0 1.43 1.092.855 1.792l-.078.086L7.414 19H11a1 1 0 01.117 1.993L11 21H5.241c-.94 0-1.43-1.092-.855-1.792l.078-.086L8.586 15H5a1 1 0 01-.117-1.993L5 13h5.759zM17 4a1 1 0 011 1v12.414l1.121-1.121a1 1 0 011.415 1.414l-2.829 2.828a1 1 0 01-1.414 0l-2.829-2.828a1 1 0 011.415-1.414L16 17.414V5a1 1 0 011-1zM8 3c.674 0 1.28.396 1.556 1.002l.054.133 2.332 6.529a1 1 0 01-1.838.78l-.046-.108L9.581 10H6.419l-.477 1.336a1 1 0 01-1.917-.56l.033-.112 2.332-6.53A1.71 1.71 0 018 3zm0 2.573L7.133 8h1.734L8 5.573z"
            fill={fill}
          />
        </G>
        <Defs>
          <ClipPath id="prefix__clip0_102_16">
            <Path fill={fill} d="M0 0h24v24H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    );
  }

  export function ZAIcon(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G clipPath="url(#prefix__clip0_102_20)">
          <Path
            d="M8 12c.674 0 1.28.396 1.556 1.002l.054.132 2.332 6.53a1 1 0 01-1.838.78l-.046-.108L9.581 19H6.419l-.477 1.336a1 1 0 01-1.917-.56l.033-.112 2.332-6.53A1.71 1.71 0 018 12zm9-8a1 1 0 011 1v12.414l1.121-1.121a1 1 0 011.415 1.414l-2.829 2.828a1 1 0 01-1.414 0l-2.829-2.828a1 1 0 011.415-1.414L16 17.414V5a1 1 0 011-1zM8 14.573L7.133 17h1.734L8 14.573zM10.759 3c.94 0 1.43 1.092.855 1.792l-.078.086L7.414 9H11a1 1 0 01.117 1.993L11 11H5.241c-.94 0-1.43-1.092-.855-1.792l.078-.086L8.586 5H5a1 1 0 01-.117-1.993L5 3h5.759z"
            fill={fill}
          />
        </G>
        <Defs>
          <ClipPath id="prefix__clip0_102_20">
            <Path fill={fill} d="M0 0h24v24H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    );
  }

 export function ArbolesPlantados(width, height, fill) {
    return (
      <Svg
        width={width}
        height={height}
        viewBox="0 0 41 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="M21.923 32.227h-2.278v33.82h2.278v-33.82z" fill={fill} />
        <Path
          d="M20.627 35.713S10.124 17.29 20.627 0c9.11 16.658 0 35.713 0 35.713zM20.627 45.052s3.922-23.346 17.716-28.773c-3.67 20.822-17.717 28.773-17.717 28.773zM21.386 57.671S26.954 35.208 41 32.432c-5.188 19.939-19.614 25.24-19.614 25.24zM20.373 45.178S16.451 21.832 2.657 16.405c3.67 20.696 17.716 28.773 17.716 28.773zM19.614 57.797S14.046 35.335 0 32.558c5.188 19.94 19.614 25.24 19.614 25.24z"
          fill={fill}
        />
      </Svg>
    );
  }