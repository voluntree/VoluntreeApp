import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  onBoarding1Icon,
  onBoarding2Icon,
  onBoarding3Icon,
} from "../../icons/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Dimensions } from "react-native";
import { theme } from "../../tailwind.config";
import { black, white } from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../utils/firebase";
import { getVoluntarioByID } from "../../service/service";
import { isEmpty } from "@firebase/util";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const onBoardings = [
    {
      fondo: "costas",
      descripcion:
        "Explora los voluntariados, apúntate y conoce gente que tambien le gusta cuidar el medioambiente",
      icon: (
        <Svg
          width="306"
          height="353"
          viewBox="0 0 306 353"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M11.6838 35.916H1L16.2613 14.3338H238.414V35.916H11.6838Z"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M238.423 35.916H8.63507V181.882H238.423V35.916Z"
            stroke="#0D6A43"
            stroke-width="0.79"
            stroke-miterlimit="10"
          />
          <Path
            d="M205.607 131.271H201.029V181.753H205.607V131.271Z"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M180.529 165.195V181.882H175.96V166.372"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M198.169 157.818C198.169 157.818 161.901 139.782 158.663 116.354C155.425 92.9249 201.269 0 201.269 0C201.269 0 241.213 81.056 242.132 114.026C243.051 146.997 198.169 157.818 198.169 157.818Z"
            fill="#0D6A43"
          />
          <Path
            d="M178.683 39.7121C178.683 39.7121 153.364 101.453 153.364 120.279"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M78.1052 225.674V193.597C78.1041 192.041 78.4096 190.5 79.0042 189.062C79.5989 187.624 80.4711 186.317 81.571 185.217C82.6708 184.116 83.9768 183.243 85.4142 182.647C86.8517 182.051 88.3924 181.745 89.9484 181.745H293.026C296.17 181.745 299.184 182.993 301.407 185.216C303.629 187.439 304.878 190.453 304.878 193.597V232.536"
            stroke="#0D6A43"
            stroke-width="0.76"
            stroke-miterlimit="10"
          />
          <Path
            d="M78.1052 231.685C85.6629 231.685 85.6629 238.556 93.2205 238.556C100.778 238.556 100.778 231.685 108.344 231.685C115.911 231.685 115.902 238.556 123.46 238.556C131.017 238.556 131.017 231.685 138.584 231.685C146.15 231.685 146.133 238.556 153.69 238.556C161.248 238.556 161.248 231.685 168.806 231.685C176.363 231.685 176.363 238.556 183.921 238.556C191.479 238.556 191.479 231.685 199.036 231.685C206.594 231.685 206.594 238.556 214.152 238.556C221.709 238.556 221.709 231.685 229.267 231.685C236.825 231.685 236.825 238.556 244.382 238.556C251.94 238.556 251.94 231.685 259.489 231.685C267.038 231.685 267.047 238.556 274.605 238.556C282.162 238.556 282.162 231.685 289.72 231.685C297.278 231.685 297.278 238.556 304.835 238.556"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M78.1052 218.142V252.89C78.1052 259.984 83.4042 265.729 89.9484 265.729H293.026C299.571 265.729 304.878 259.984 304.878 252.89V210.687"
            stroke="#0D6A43"
            stroke-width="0.79"
            stroke-miterlimit="10"
          />
          <Path
            d="M22.6426 187.465V242.498H72.5318V187.465H22.6426ZM68.5211 235.559C68.5211 236.397 68.1881 237.201 67.5954 237.794C67.0027 238.386 66.1988 238.719 65.3606 238.719H29.5475C28.7093 238.719 27.9054 238.386 27.3127 237.794C26.72 237.201 26.3871 236.397 26.3871 235.559V195.374C26.3871 194.96 26.4689 194.549 26.6278 194.166C26.7867 193.783 27.0197 193.435 27.3133 193.143C27.6069 192.85 27.9553 192.618 28.3387 192.46C28.7221 192.302 29.1329 192.221 29.5475 192.222H65.3606C65.7752 192.221 66.186 192.302 66.5694 192.46C66.9528 192.618 67.3013 192.85 67.5949 193.143C67.8884 193.435 68.1214 193.783 68.2803 194.166C68.4392 194.549 68.5211 194.96 68.5211 195.374V235.559Z"
            fill="#EB672E"
          />
          <Path
            d="M71.6812 217.163V212.8H23.2177V217.163H71.6812Z"
            fill="#EB672E"
          />
          <Path
            d="M49.7815 192.222H45.4186V240.686H49.7815V192.222Z"
            fill="#EB672E"
          />
          <Path
            d="M26.0346 126.411C26.0346 126.411 14.6294 139.817 19.851 148.5C25.0727 157.182 43.9669 126.411 43.9669 126.411"
            fill="#066942"
          />
          <Path
            d="M63.6083 157.715H48.3298C46.3717 125.019 26.0003 126.866 26.0003 126.866C26.0003 126.866 28.5768 116.5 43.3056 116.963C56.5659 117.384 62.5262 150.896 63.6083 157.715Z"
            fill={theme.colors.costas}
            stroke="#0D6A43"
            stroke-width="0.96"
            stroke-miterlimit="10"
          />
          <Path
            d="M47.9693 157.715C47.2528 157.715 46.5434 157.856 45.8816 158.131C45.2199 158.406 44.6189 158.808 44.1131 159.316C43.6072 159.823 43.2065 160.425 42.9339 161.088C42.6613 161.751 42.5221 162.46 42.5243 163.177V165.556C42.526 169.537 43.9833 173.381 46.6218 176.363C49.2602 179.344 52.8979 181.259 56.8496 181.745C57.5188 181.831 58.193 181.874 58.8678 181.874H72.9182C73.6358 181.874 74.3528 181.831 75.0653 181.745C79.4939 181.221 83.5763 179.09 86.5382 175.756C89.5 172.422 91.1353 168.117 91.1339 163.658C91.1339 162.877 90.9802 162.105 90.6815 161.384C90.3828 160.662 89.9451 160.007 89.3932 159.455C88.8413 158.904 88.1862 158.466 87.4651 158.167C86.7441 157.869 85.9713 157.715 85.1908 157.715H47.9693Z"
            stroke="#0D6A43"
            stroke-width="0.79"
            stroke-miterlimit="10"
          />
          <Path
            d="M58.4038 157.715C58.4038 157.715 52.976 117.625 36.9331 117.53"
            stroke="#0D6A43"
            stroke-width="0.79"
            stroke-miterlimit="10"
          />
          <Path
            d="M31.5914 130.542C31.5914 130.542 23.2178 135.952 21.1824 146.275"
            stroke="#1D1D1B"
            stroke-width="0.55"
            stroke-miterlimit="10"
          />
          <Path
            d="M270.336 297.24H266.506V352.84H270.336V297.24Z"
            fill="#EB672E"
          />
          <Path
            d="M268.224 303.02C268.224 303.02 250.884 272.583 268.224 244.156C283.236 271.595 268.224 303.02 268.224 303.02Z"
            fill="#EB672E"
          />
          <Path
            d="M268.292 318.401C268.292 318.401 274.751 279.977 297.321 271.011C291.189 305.192 268.292 318.401 268.292 318.401Z"
            fill="#EB672E"
          />
          <Path
            d="M269.375 339.125C269.375 339.125 278.581 302.195 301.641 297.678C293.07 330.433 269.375 339.125 269.375 339.125Z"
            fill="#EB672E"
          />
          <Path
            d="M267.7 318.573C267.7 318.573 261.25 280.106 238.672 271.174C244.804 305.356 267.7 318.573 267.7 318.573Z"
            fill="#EB672E"
          />
          <Path
            d="M266.618 339.296C266.618 339.296 257.42 302.367 234.36 297.849C242.923 330.648 266.618 339.296 266.618 339.296Z"
            fill="#EB672E"
          />
          <Path
            d="M72.5317 148.955C82.1763 148.955 91.1338 156.512 91.1338 156.512C91.1338 156.512 109.015 176.884 113.214 163.941C117.414 150.999 95.6599 138.331 84.8043 139.473C73.9487 140.616 68.4866 157.715 68.4866 157.715"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M68.521 157.715L85.1908 157.818L88.9181 154.76C88.9181 154.76 79.471 147.89 72.6004 148.869C70.5777 151.464 69.1816 154.491 68.521 157.715V157.715Z"
            fill="#0D6A43"
          />
          <Path
            d="M76.7742 143.656C76.7742 143.656 94.9985 142.591 111.874 165.358"
            stroke="#0D6A43"
            stroke-width="0.79"
            stroke-miterlimit="10"
          />
          <Path
            d="M61.2294 143.656C61.2294 143.656 65.764 122.125 80.1235 123.757C94.4831 125.389 78.1397 142.994 78.1397 142.994"
            stroke="#0D6A43"
            stroke-width="0.75"
            stroke-miterlimit="10"
          />
          <Path
            d="M68.4778 142.505C68.4778 142.505 72.5314 132.654 78.7236 129.167Z"
            fill="#B1D9C9"
          />
          <Path
            d="M68.4778 142.505C68.4778 142.505 72.5314 132.654 78.7236 129.167"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M238.414 73.6959H290.072V181.745"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M286.001 134.638C286.001 133.443 285.032 132.474 283.837 132.474C282.642 132.474 281.673 133.443 281.673 134.638V137.232C281.673 138.427 282.642 139.396 283.837 139.396C285.032 139.396 286.001 138.427 286.001 137.232V134.638Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M85.8776 55.0937H32.158V78.1618H85.8776V55.0937Z"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M176.518 166.372C176.518 166.372 140.241 148.336 137.012 124.908C133.783 101.479 179.61 8.58826 179.61 8.58826C179.61 8.58826 219.554 89.6442 220.473 122.606C221.392 155.568 176.518 166.372 176.518 166.372Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M58.4038 55.0937V77.9814"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
        </Svg>
      ),
    },
    {
      fondo: "comunitario",
      descripcion:
        "Participa en actividades con labor social mejorando la comunidad en la qué vivimos",
      icon: (
        <Svg
          width="256"
          height="270"
          viewBox="0 0 256 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M5.20123 189.889C5.20123 189.889 40.0645 186.703 48.3469 204.78C56.6293 222.857 54.1511 230.039 62.4806 239.966C70.8101 249.892 95.1202 255.147 98.1542 258.184C101.188 261.22 103.139 264.764 103.139 268.393C98.9363 268.938 11.8347 283.574 5.20123 189.889Z"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M86.8472 218.617V253.399"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M127.449 231.693C126.064 225.893 124.867 224.069 120.259 221.945C114.785 219.416 90.9178 219.896 90.9178 219.896C90.9178 219.896 87.5068 220.779 63.5925 204.78C35.8997 183.939 5.20123 189.889 5.20123 189.889"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M137.126 242.729C137.126 242.729 137.126 236.779 129.588 232.887C121.239 228.563 86.8284 229.606 86.8284 229.606"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M86.8472 238.038C86.8472 238.038 125.159 239.486 134.016 241.883C141.554 243.914 144.315 255.42 144.315 255.42H133.583"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M86.8472 246.734C86.8472 246.734 125.809 248.67 131.01 252.374C137.135 256.717 137.135 264.266 137.135 264.266H102.272"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M109.772 234.598C129.698 234.598 145.851 218.483 145.851 198.603C145.851 178.724 129.698 162.609 109.772 162.609C89.8464 162.609 73.6934 178.724 73.6934 198.603C73.6934 218.483 89.8464 234.598 109.772 234.598Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M136.768 136.448H132.019V205.174H136.768V136.448Z"
            fill="#FFE7A3"
          />
          <Path
            d="M134.148 143.592C134.148 143.592 112.655 105.99 134.148 70.8325C152.739 104.749 134.148 143.592 134.148 143.592Z"
            fill="#FFE7A3"
          />
          <Path
            d="M134.233 162.628C134.233 162.628 142.233 115.08 170.199 104.044C162.604 146.281 134.233 162.628 134.233 162.628Z"
            fill="#FFE7A3"
          />
          <Path
            d="M135.58 188.225C135.58 188.225 146.972 142.558 175.551 136.993C164.894 177.481 135.58 188.225 135.58 188.225Z"
            fill="#FFE7A3"
          />
          <Path
            d="M133.498 162.816C133.498 162.816 125.498 115.278 97.5323 104.232C105.136 146.487 133.498 162.816 133.498 162.816Z"
            fill="#FFE7A3"
          />
          <Path
            d="M132.16 188.432C132.16 188.432 120.759 142.765 92.1804 137.2C102.8 177.669 132.16 188.432 132.16 188.432Z"
            fill="#FFE7A3"
          />
          <Path
            d="M80.7509 95.0387C88.718 95.0387 95.1767 88.5951 95.1767 80.6466C95.1767 72.698 88.718 66.2545 80.7509 66.2545C72.7837 66.2545 66.325 72.698 66.325 80.6466C66.325 88.5951 72.7837 95.0387 80.7509 95.0387Z"
            fill="#FFE7A3"
          />
          <Path
            d="M242.281 80.1107C242.281 80.1107 207.418 83.3069 199.135 65.2204C190.853 47.1339 193.321 39.9708 185.001 30.0345C176.681 20.0982 152.39 14.8527 149.347 11.8258C146.303 8.79883 144.372 5.24546 144.372 1.60748C148.517 1.06225 235.647 -13.5743 242.281 80.1107Z"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M160.625 51.3829V16.6106"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M120.033 38.3069C121.418 44.107 122.615 45.9307 127.223 48.0552C132.697 50.5839 156.555 50.1139 156.555 50.1139C156.555 50.1139 159.966 49.1738 183.88 65.2204C211.545 86.0612 242.243 80.1107 242.243 80.1107"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M110.347 27.2613C110.347 27.2613 110.347 33.2118 117.885 37.1036C126.224 41.4278 160.635 40.3938 160.635 40.3938"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M160.625 31.9616C160.625 31.9616 122.314 30.5139 113.513 28.1168C105.975 26.0957 103.205 14.5801 103.205 14.5801H113.946"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M160.625 23.2755C160.625 23.2755 121.673 21.3296 116.462 17.6353C110.338 13.2923 110.338 5.74368 110.338 5.74368H145.201"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M223.313 198.557C221.172 199.886 218.891 200.977 216.51 201.809V184.888H198.815C198.815 184.888 201.255 179.192 203.008 177.293C204.76 175.394 205.448 166.163 194.283 166.163C183.117 166.163 182.768 175.121 184.511 177.838C185.803 180.071 186.855 182.435 187.649 184.888H170.283V232.774H187.159C186.363 230.317 185.308 227.95 184.012 225.714C182.269 222.998 182.618 214.039 193.783 214.039C204.949 214.039 204.261 223.27 202.508 225.169C200.756 227.068 198.325 232.774 198.325 232.774H216.463V213.39C216.463 213.39 221.956 215.919 223.794 217.733C225.631 219.548 234.526 220.262 234.526 208.681C234.526 197.099 225.886 196.742 223.313 198.557Z"
            fill="#EB672E"
          />
          <Path
            d="M244.269 158.285C242.129 159.62 239.848 160.714 237.466 161.547V144.626H219.855C219.855 144.626 222.296 138.929 224.048 137.031C225.801 135.132 226.489 125.9 215.323 125.9C204.157 125.9 203.799 134.859 205.552 137.566C206.842 139.804 207.894 142.17 208.69 144.626H191.277V192.512H208.153C207.356 190.054 206.302 187.688 205.005 185.452C203.262 182.736 203.611 173.777 214.777 173.777C225.942 173.777 225.245 183.008 223.502 184.907C221.759 186.806 219.318 192.512 219.318 192.512H237.447V173.128C237.447 173.128 242.94 175.657 244.768 177.471C246.596 179.286 255.51 180 255.51 168.419C255.51 156.837 246.87 156.48 244.269 158.285Z"
            stroke="#0D6A43"
            stroke-miterlimit="10"
          />
          <Path
            d="M19.6553 81.5302C19.6553 77.488 22.3407 75.0909 25.8648 75.0909C29.3888 75.0909 32.0365 77.488 32.0365 81.5302C32.0365 85.5724 29.3605 87.9695 25.8365 87.9695C22.3125 87.9695 19.6553 85.5442 19.6553 81.5302ZM25.8648 85.986C28.1544 85.986 29.6338 84.1717 29.6338 81.5302C29.6338 78.8887 28.1544 77.0838 25.8648 77.0838C23.5751 77.0838 22.0958 78.8981 22.0958 81.5302C22.0958 84.1623 23.5563 85.986 25.8648 85.986Z"
            fill="#EB662E"
          />
          <Path
            d="M36.3803 79.0861V87.6875H33.921V75.3729H36.5405L41.9773 83.9743V75.3729H44.4271V87.6875H41.8077L36.3803 79.0861Z"
            fill="#EB662E"
          />
          <Path
            d="M95.7986 57.4462H15.3775C7.14495 57.4462 0.47113 64.1044 0.47113 72.3177V88.966C0.47113 97.1793 7.14495 103.837 15.3775 103.837H95.7986C104.031 103.837 110.705 97.1793 110.705 88.966V72.3177C110.705 64.1044 104.031 57.4462 95.7986 57.4462Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
        </Svg>
      ),
    },
    {
      fondo: "educacion",
      descripcion:
        "Descubre fácilmente asociaciones, actividades e iniciativas cerca de ti",
      icon: (
        <Svg
          width="288"
          height="340"
          viewBox="0 0 288 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M226.813 70.672L287.535 58.5746V204.487H226.813"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M226.823 0.464215H12.2838V204.487H226.823V0.464215Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M262.893 204.486H79.0353C75.8231 204.486 73.2191 207.084 73.2191 210.289V294.284C73.2191 297.489 75.8231 300.087 79.0353 300.087H262.893C266.105 300.087 268.709 297.489 268.709 294.284V210.289C268.709 207.084 266.105 204.486 262.893 204.486Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M69.1896 108.153L67.6542 107.289C62.0706 104.058 42.9655 92.8708 46.8368 91.506C51.3688 89.8626 79.5006 89.8626 79.5006 89.8626L75.7782 106.361"
            fill="#EC672E"
          />
          <Path
            d="M130.451 111.644L128.915 110.78C123.285 107.549 104.226 96.3617 108.098 94.9969C112.63 93.3535 140.752 93.3535 140.752 93.3535L137.03 109.852"
            fill="#EC672E"
          />
          <Path
            d="M178.581 111.644L177.045 110.78C171.406 107.549 152.357 96.3617 156.228 94.9969C160.76 93.3535 188.882 93.3535 188.882 93.3535L185.16 109.852"
            fill="#EC672E"
          />
          <Path
            d="M12.2838 0.464215C12.2838 0.464215 17.7836 82.7323 30.4769 108.626C48.2512 99.0912 75.7503 89.6305 73.2098 99.8433C73.2098 99.8433 63.9038 108.199 73.2098 111.996C79.5099 114.559 94.967 112.294 101.984 105.674C109 99.0541 121.154 95.2104 126.077 95.3125C129.501 95.3868 133.522 96.0646 133.894 100.02C134.34 104.253 125.351 108.162 130.451 111.402C138.612 116.592 156.06 103.91 163.254 100.976C166.92 99.4905 175.808 95.7582 179.716 98.0143C180.624 98.5691 181.325 99.4044 181.713 100.393C182.101 101.382 182.154 102.47 181.866 103.492C180.368 108.273 173.286 112.6 182.145 113.9C187.449 114.67 193.312 112.786 198.375 111.421C207.476 108.96 244.383 101.784 253.475 107.364C256.481 100.744 219.238 22.9601 226.813 0.436362"
            fill="#F6B8BB"
          />
          <Path
            d="M182.499 219.109L160.788 246.721C160.174 247.504 159.411 248.159 158.542 248.648C157.674 249.137 156.718 249.45 155.728 249.57C154.739 249.69 153.735 249.614 152.775 249.346C151.815 249.079 150.917 248.625 150.133 248.011L122.457 226.37C120.873 225.129 119.847 223.311 119.604 221.317C119.362 219.322 119.922 217.312 121.163 215.73L129.957 204.533H176.161L181.196 208.469C182.781 209.709 183.809 211.526 184.054 213.52C184.298 215.515 183.739 217.525 182.499 219.109V219.109Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M268.709 210.753V210.893L212.175 282.762C210.941 284.341 209.13 285.368 207.138 285.619C205.147 285.869 203.137 285.323 201.548 284.099L173.872 262.448C173.087 261.835 172.43 261.074 171.94 260.208C171.45 259.342 171.136 258.388 171.016 257.401C170.896 256.413 170.972 255.412 171.24 254.454C171.508 253.496 171.963 252.6 172.578 251.818L209.728 204.533H262.427C263.249 204.529 264.064 204.687 264.825 204.998C265.585 205.309 266.277 205.766 266.861 206.344C267.444 206.922 267.908 207.608 268.225 208.365C268.542 209.122 268.706 209.933 268.709 210.753Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M268.709 230.705V293.681C268.709 294.523 268.542 295.357 268.219 296.134C267.896 296.912 267.422 297.619 266.825 298.214C266.228 298.809 265.519 299.28 264.739 299.602C263.958 299.923 263.122 300.088 262.278 300.087H210.593L262.827 233.602C263.53 232.713 264.422 231.991 265.44 231.49C266.457 230.989 267.574 230.721 268.709 230.705V230.705Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M198.914 300.087H120.828L97.8798 282.131L73.2191 262.848V210.521C73.2191 208.921 73.8564 207.386 74.9908 206.254C76.1252 205.122 77.6637 204.486 79.268 204.486H80.1986L196.057 295.101C197.633 296.321 198.661 298.113 198.914 300.087V300.087Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M46.6693 240.008H6.60721C4.85713 240.016 3.18083 240.712 1.94333 241.947C0.705823 243.182 0.00734822 244.854 0 246.6V333.408C0.00734822 335.154 0.705823 336.827 1.94333 338.061C3.18083 339.296 4.85713 339.993 6.60721 340H46.6693C48.4193 339.993 50.0956 339.296 51.3331 338.061C52.5706 336.827 53.2691 335.154 53.2765 333.408V246.6C53.2691 244.854 52.5706 243.182 51.3331 241.947C50.0956 240.712 48.4193 240.016 46.6693 240.008ZM49.5541 329.75C49.5516 331.005 49.0508 332.208 48.1613 333.096C47.2718 333.983 46.066 334.483 44.8081 334.485H8.4684C7.21043 334.483 6.00469 333.983 5.11517 333.096C4.22565 332.208 3.72483 331.005 3.72237 329.75V251.762C3.72483 250.51 4.22467 249.309 5.11244 248.423C6.00022 247.538 7.20359 247.039 8.45909 247.036H44.8081C46.0652 247.036 47.2709 247.534 48.1607 248.42C49.0505 249.306 49.5516 250.508 49.5541 251.762V329.75Z"
            fill="#F6B8BB"
          />
          <Path
            d="M13.4936 245.421C14.1463 245.421 14.6755 244.893 14.6755 244.242C14.6755 243.591 14.1463 243.063 13.4936 243.063C12.8409 243.063 12.3118 243.591 12.3118 244.242C12.3118 244.893 12.8409 245.421 13.4936 245.421Z"
            fill="#EB672E"
          />
          <Path
            d="M16.974 245.421C17.6267 245.421 18.1558 244.893 18.1558 244.242C18.1558 243.591 17.6267 243.063 16.974 243.063C16.3212 243.063 15.7921 243.591 15.7921 244.242C15.7921 244.893 16.3212 245.421 16.974 245.421Z"
            fill="#EB672E"
          />
          <Path
            d="M179.837 184.952H19.3284V190.3H179.837V184.952Z"
            fill="#EB672E"
          />
          <Path
            d="M119.535 337.763C117.553 339.889 96.4188 304.822 95.4324 300.7C91.589 284.61 102.691 270.173 119.535 270.164C136.378 270.154 148.625 284.879 143.079 301.359C138.584 314.737 129.073 327.522 119.535 337.763Z"
            fill="#FEBBBB"
            stroke="#EC672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M119.544 306.911C126.637 306.911 132.386 301.175 132.386 294.098C132.386 287.022 126.637 281.286 119.544 281.286C112.451 281.286 106.702 287.022 106.702 294.098C106.702 301.175 112.451 306.911 119.544 306.911Z"
            fill="#FFE7A3"
            stroke="#EC672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M163.784 174.953V183.643C163.787 184.084 163.737 184.523 163.636 184.952H36.1443C36.0351 184.525 35.9819 184.085 35.9861 183.643V174.953C35.9861 173.421 36.5956 171.951 37.6809 170.866C38.7661 169.782 40.2384 169.172 41.7744 169.169H157.968C158.731 169.167 159.487 169.314 160.193 169.604C160.898 169.894 161.539 170.319 162.08 170.857C162.62 171.394 163.049 172.032 163.341 172.735C163.634 173.438 163.784 174.192 163.784 174.953V174.953Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M34.283 190.3L24.6886 204.486H38.2287L49.2376 190.3H34.283Z"
            fill="#EB672E"
          />
          <Path
            d="M162.705 190.3L172.299 204.486H158.759L147.76 190.3H162.705Z"
            fill="#EB672E"
          />
          <Path
            d="M55.8635 36.0416L73.2191 97.6522"
            stroke="#FCE7E7"
            stroke-miterlimit="10"
          />
          <Path
            d="M116.799 36.0416C116.799 36.0416 130.283 91.441 133.894 100.048"
            stroke="#FCE7E7"
            stroke-miterlimit="10"
          />
          <Path
            d="M168.847 30.5546C168.847 30.5546 172.411 86.6781 181.549 100.048"
            stroke="#FCE7E7"
            stroke-miterlimit="10"
          />
          <Path
            d="M236.017 190.811H256.416C256.507 190.811 256.595 190.847 256.659 190.911C256.724 190.976 256.76 191.063 256.76 191.154V195.026C256.76 197.087 255.939 199.063 254.479 200.521C253.018 201.978 251.037 202.797 248.971 202.797H243.815C241.75 202.797 239.768 201.978 238.308 200.521C236.847 199.063 236.026 197.087 236.026 195.026V190.811H236.017Z"
            stroke="#EB672E"
            stroke-miterlimit="10"
          />
          <Path
            d="M48.884 239.108H50.5963V214.263H48.884V239.108Z"
            fill="#EB672E"
          />
          <Path
            d="M49.8239 236.527C49.8239 236.527 57.5944 250.128 49.8239 262.829C43.1051 250.564 49.8239 236.527 49.8239 236.527Z"
            fill="#EB672E"
          />
          <Path
            d="M49.796 229.647C49.796 229.647 46.9019 246.841 36.7677 250.834C39.5409 235.552 49.796 229.647 49.796 229.647Z"
            fill="#EB672E"
          />
          <Path
            d="M49.3215 220.39C49.3215 220.39 45.199 236.898 34.8694 238.913C38.6941 224.271 49.3215 220.39 49.3215 220.39Z"
            fill="#EB672E"
          />
          <Path
            d="M50.0566 229.573C50.0566 229.573 52.9508 246.767 63.0849 250.759C60.3118 235.477 50.0566 229.573 50.0566 229.573Z"
            fill="#EB672E"
          />
          <Path
            d="M50.5498 220.316C50.5498 220.316 54.663 236.824 64.9926 238.838C61.1586 224.197 50.5498 220.316 50.5498 220.316Z"
            fill="#EB672E"
          />
          <Path
            d="M247.324 156.347H245.611V190.811H247.324V156.347Z"
            fill="#EB672E"
          />
          <Path
            d="M246.384 158.928C246.384 158.928 238.613 145.327 246.384 132.626C253.121 144.891 246.384 158.928 246.384 158.928Z"
            fill="#EB672E"
          />
          <Path
            d="M246.412 165.808C246.412 165.808 249.306 148.614 259.44 144.631C256.667 159.903 246.412 165.808 246.412 165.808Z"
            fill="#EB672E"
          />
          <Path
            d="M246.151 165.882C246.151 165.882 243.257 148.697 233.123 144.705C235.896 159.978 246.151 165.882 246.151 165.882Z"
            fill="#EB672E"
          />
        </Svg>
      ),
    },
  ];

  const navigation = useNavigation()
  const [completed, setCompleted] = useState(false);

  const scrollX = new Animated.Value(0);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });
  }, []);

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={styles.dotsRootContainer}>
        <View style={styles.dotContainer}>
          {onBoardings.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [8, 17, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={[styles.dot, { width: dotSize, height: dotSize }]}
              ></Animated.View>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        horizontal
        decelerationRate={0}
        scrollEventThrottle={32}
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {onBoardings.map((item, index) =>
          item.fondo == "costas" ? (
            <View
              className="bg-costas items-center justify-center"
              style={{ width: width }}
              key={index}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </View>
              <View
                className="px-14"
                style={{ position: "absolute", top: "10%" }}
              >
                <Text className="text-left text-ambiental">
                  <Text className="">
                    {item.descripcion.slice(0, item.descripcion.length - 23)}
                  </Text>
                  <Text className=" font-bold">
                    {item.descripcion.slice(
                      item.descripcion.length - 23,
                      item.descripcion.length
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          ) : item.fondo == "educacion" ? (
            <View
              className="bg-educacion items-center justify-center"
              style={{ width: width }}
              key={index}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </View>
              <View
                className="px-14"
                style={{ position: "absolute", top: "10%" }}
              >
                <Text className="text-left text-cultural">
                  <Text className="">
                    {item.descripcion.slice(0, item.descripcion.length - 11)}
                  </Text>
                  <Text className=" font-bold">
                    {item.descripcion.slice(
                      item.descripcion.length - 11,
                      item.descripcion.length
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          ) : (
            <View
              className="bg-comunitario items-center justify-center"
              style={{ width: width }}
              key={index}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </View>
              <View
                className="px-14"
                style={{ position: "absolute", top: "10%" }}
              >
                <Text className="text-left">
                  <Text className="text-ambiental">
                    {item.descripcion.slice(0, item.descripcion.length - 40)}
                  </Text>
                  <Text className="text-ambiental font-bold">
                    {item.descripcion.slice(
                      item.descripcion.length - 40,
                      item.descripcion.length
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          )
        )}
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right:0,
            width: 120,
            height: 50,
            paddingLeft: 20,
            justifyContent: "center",
            marginBottom:50,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            backgroundColor: theme.colors.ambiental,
          }}
          onPress={() => {
            if(!isEmpty(getVoluntarioByID(auth.currentUser.uid))){navigation.navigate("UserHome");}
            else navigation.navigate("AssociationHome")  
          }}
        >
          <Text className = "font-extrabold text-costas">VAMOS!</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
      {renderDots()}
    </SafeAreaView>
  );
};

export default OnBoarding;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: white,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: height > 700 ? "14%" : "10%",
  },
  dotContainer: {
    flexDirection: "row",
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    borderRadius: 12,
    backgroundColor: theme.colors.ambiental,
    marginHorizontal: 12 / 2,
  },
});
