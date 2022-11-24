import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileComp } from "../components/profile/ProfileComp";
import { TeachersComp } from "../components/teachers/TeachersComp";
import { ScheduleComp } from "../components/schedule/ScheduleComp";
import { SvgXml } from "react-native-svg";
import { vs } from "../const/size";
import { DebtsComp } from "../components/debts/DebtsComp";

const ScheduleSVG = (props: any) => {
  if (props.focused) {
    return (
      <SvgXml
        xml={_scheduleOn}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  } else {
    return (
      <SvgXml
        xml={_scheduleOff}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  }
};

const DebtsSVG = (props: any) => {
  if (props.focused) {
    return (
      <SvgXml
        xml={_debtsOn}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  } else {
    return (
      <SvgXml
        xml={_debtsOff}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  }
};

const TeachersSVG = (props: any) => {
  if (props.focused) {
    return (
      <SvgXml
        xml={_teachersOn}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  } else {
    return (
      <SvgXml
        xml={_teachersOff}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  }
};

const ProfileSVG = (props: any) => {
  if (props.focused) {
    return (
      <SvgXml
        xml={_profileOn}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  } else {
    return (
      <SvgXml
        xml={_profileOff}
        height={vs(24).toString()}
        width={vs(24).toString()}
      />
    );
  }
};

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Расписание"
          component={ScheduleComp}
          options={{
            headerShown: false,
            tabBarInactiveTintColor: "#71727A",
            tabBarActiveTintColor: "#000",
            tabBarIcon: (props) => <ScheduleSVG {...props} />,
          }}
        />
        <Tab.Screen
          name="Задолженности"
          component={DebtsComp}
          options={{
            headerShown: false,
            tabBarInactiveTintColor: "#71727A",
            tabBarActiveTintColor: "#000",
            tabBarIcon: (props) => <DebtsSVG {...props} />,
          }}
        />
        <Tab.Screen
          name="Преподаватели"
          component={TeachersComp}
          options={{
            headerShown: false,
            tabBarInactiveTintColor: "#71727A",
            tabBarActiveTintColor: "#000",
            tabBarIcon: (props) => <TeachersSVG {...props} />,
          }}
        />
        <Tab.Screen
          name="Профиль"
          component={ProfileComp}
          options={{
            headerShown: false,
            tabBarInactiveTintColor: "#71727A",
            tabBarActiveTintColor: "#000",
            tabBarIcon: (props) => <ProfileSVG {...props} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const _scheduleOff = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0507 2.3072L14.0516 2.93189C16.3471 3.1118 17.8635 4.67601 17.8659 7.07481L17.875 14.0963C17.8783 16.7117 16.2352 18.3208 13.6015 18.325L7.16824 18.3333C4.55099 18.3367 2.88735 16.6892 2.88406 14.0663L2.87501 7.12729C2.87171 4.71266 4.33461 3.15261 6.63014 2.94188L6.62932 2.3172C6.6285 1.95071 6.90001 1.67502 7.26203 1.67502C7.62405 1.67419 7.89557 1.94905 7.89639 2.31553L7.89721 2.89857L12.7845 2.89191L12.7837 2.30887C12.7828 1.94238 13.0544 1.66752 13.4164 1.66669C13.7702 1.66586 14.0499 1.94072 14.0507 2.3072ZM4.1429 7.38466L16.5997 7.368V7.07648C16.5643 5.28571 15.6658 4.34618 14.0532 4.20625L14.054 4.8476C14.054 5.20575 13.7751 5.48977 13.4213 5.48977C13.0593 5.49061 12.787 5.20742 12.787 4.84926L12.7861 4.1746L7.89886 4.18126L7.89968 4.85509C7.89968 5.21408 7.62899 5.49727 7.26697 5.49727C6.90495 5.4981 6.63261 5.21574 6.63261 4.85676L6.63179 4.21541C5.02738 4.37617 4.13961 5.31903 4.14208 7.12562L4.1429 7.38466ZM13.0749 11.1703V11.1794C13.0832 11.5626 13.3958 11.8533 13.7751 11.8449C14.1454 11.8358 14.4407 11.5184 14.4325 11.1353C14.4152 10.7688 14.1182 10.4698 13.7488 10.4706C13.3703 10.4789 13.0741 10.7871 13.0749 11.1703ZM13.7545 14.9101C13.3761 14.9017 13.0708 14.5861 13.07 14.2029C13.0618 13.8198 13.3654 13.5024 13.7438 13.4933H13.7521C14.1388 13.4933 14.4522 13.8089 14.4522 14.2004C14.4531 14.5919 14.1404 14.9092 13.7545 14.9101ZM9.6851 11.1836C9.70155 11.5667 10.015 11.8657 10.3935 11.8491C10.7638 11.8316 11.0591 11.5151 11.0427 11.1319C11.0336 10.7571 10.7292 10.4656 10.3589 10.4664C9.98047 10.4831 9.68428 10.8004 9.6851 11.1836ZM10.3968 14.8726C10.0183 14.8892 9.70567 14.5902 9.68839 14.2071C9.68839 13.8239 9.98377 13.5074 10.3622 13.4899C10.7325 13.4891 11.0377 13.7806 11.046 14.1546C11.0632 14.5386 10.767 14.8551 10.3968 14.8726ZM6.29527 11.2127C6.31173 11.5959 6.6252 11.8957 7.00368 11.8782C7.37393 11.8616 7.6693 11.5442 7.65203 11.1611C7.6438 10.7863 7.33937 10.4948 6.9683 10.4956C6.58983 10.5123 6.29445 10.8296 6.29527 11.2127ZM7.00697 14.8767C6.6285 14.8942 6.31584 14.5944 6.29856 14.2112C6.29774 13.8281 6.59394 13.5108 6.97241 13.4941C7.34266 13.4933 7.64791 13.7848 7.65614 14.1596C7.67342 14.5427 7.37804 14.8601 7.00697 14.8767Z" fill="#D4D6DD"/>
</svg>
`;
const _scheduleOn = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0507 2.3072L14.0516 2.93189C16.3471 3.1118 17.8635 4.67601 17.8659 7.07481L17.875 14.0963C17.8783 16.7117 16.2352 18.3208 13.6015 18.325L7.16824 18.3333C4.55099 18.3367 2.88735 16.6892 2.88406 14.0663L2.87501 7.12729C2.87171 4.71266 4.33461 3.15261 6.63014 2.94188L6.62932 2.3172C6.6285 1.95071 6.90001 1.67502 7.26203 1.67502C7.62405 1.67419 7.89557 1.94905 7.89639 2.31553L7.89721 2.89857L12.7845 2.89191L12.7837 2.30887C12.7828 1.94238 13.0544 1.66752 13.4164 1.66669C13.7702 1.66586 14.0499 1.94072 14.0507 2.3072ZM4.1429 7.38466L16.5997 7.368V7.07648C16.5643 5.28571 15.6658 4.34618 14.0532 4.20625L14.054 4.8476C14.054 5.20575 13.7751 5.48977 13.4213 5.48977C13.0593 5.49061 12.787 5.20742 12.787 4.84926L12.7861 4.1746L7.89886 4.18126L7.89968 4.85509C7.89968 5.21408 7.62899 5.49727 7.26697 5.49727C6.90495 5.4981 6.63261 5.21574 6.63261 4.85676L6.63179 4.21541C5.02738 4.37617 4.13961 5.31903 4.14208 7.12562L4.1429 7.38466ZM13.0749 11.1703V11.1794C13.0832 11.5626 13.3958 11.8533 13.7751 11.8449C14.1454 11.8358 14.4407 11.5184 14.4325 11.1353C14.4152 10.7688 14.1182 10.4698 13.7488 10.4706C13.3703 10.4789 13.0741 10.7871 13.0749 11.1703ZM13.7545 14.9101C13.3761 14.9017 13.0708 14.5861 13.07 14.2029C13.0618 13.8198 13.3654 13.5024 13.7438 13.4933H13.7521C14.1388 13.4933 14.4522 13.8089 14.4522 14.2004C14.4531 14.5919 14.1404 14.9092 13.7545 14.9101ZM9.6851 11.1836C9.70155 11.5667 10.015 11.8657 10.3935 11.8491C10.7638 11.8316 11.0591 11.5151 11.0427 11.1319C11.0336 10.7571 10.7292 10.4656 10.3589 10.4664C9.98047 10.4831 9.68428 10.8004 9.6851 11.1836ZM10.3968 14.8726C10.0183 14.8892 9.70567 14.5902 9.68839 14.2071C9.68839 13.8239 9.98377 13.5074 10.3622 13.4899C10.7325 13.4891 11.0377 13.7806 11.046 14.1546C11.0632 14.5386 10.767 14.8551 10.3968 14.8726ZM6.29527 11.2127C6.31173 11.5959 6.6252 11.8957 7.00368 11.8782C7.37393 11.8616 7.6693 11.5442 7.65203 11.1611C7.6438 10.7863 7.33937 10.4948 6.9683 10.4956C6.58983 10.5123 6.29445 10.8296 6.29527 11.2127ZM7.00697 14.8767C6.6285 14.8942 6.31584 14.5944 6.29856 14.2112C6.29774 13.8281 6.59394 13.5108 6.97241 13.4941C7.34266 13.4933 7.64791 13.7848 7.65614 14.1596C7.67342 14.5427 7.37804 14.8601 7.00697 14.8767Z" fill="#006FFD"/>
</svg>
`;

const _debtsOff = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04538 2.9325C8.48676 2.9325 8.01152 3.32069 7.87812 3.84389H12.3637C12.2303 3.32069 11.7551 2.9325 11.1965 2.9325H9.04538ZM13.631 3.84389H15.2818C17.0327 3.84389 18.4584 5.28692 18.4584 7.05906C18.4584 7.05906 18.4084 7.80927 18.3917 8.85399C18.39 8.93669 18.35 9.0177 18.2842 9.06665C17.8831 9.36285 17.5163 9.60757 17.4829 9.62445C16.0989 10.5527 14.4906 11.2059 12.7772 11.5308C12.6655 11.5527 12.5555 11.4945 12.4988 11.3949C12.0185 10.5628 11.1214 10.0211 10.1209 10.0211C9.12708 10.0211 8.22163 10.5569 7.72722 11.3898C7.66969 11.4877 7.5613 11.5443 7.45041 11.5232C5.75123 11.1974 4.14292 10.5451 2.76724 9.63289L1.96684 9.07593C1.90014 9.03374 1.85845 8.95779 1.85845 8.8734C1.83344 8.44302 1.79175 7.05906 1.79175 7.05906C1.79175 5.28692 3.21746 3.84389 4.96834 3.84389H6.61082C6.76924 2.62027 7.79475 1.66669 9.04538 1.66669H11.1965C12.4471 1.66669 13.4726 2.62027 13.631 3.84389ZM18.1749 10.6794L18.1416 10.6963C16.4574 11.8271 14.4314 12.5781 12.3053 12.8903C12.0052 12.9325 11.705 12.7384 11.6217 12.4346C11.4382 11.7427 10.8463 11.287 10.1376 11.287H10.1292H10.1126C9.40389 11.287 8.81192 11.7427 8.6285 12.4346C8.54512 12.7384 8.24497 12.9325 7.94482 12.8903C5.81876 12.5781 3.79275 11.8271 2.10857 10.6963C2.10024 10.6878 2.01686 10.6372 1.95016 10.6794C1.87512 10.7216 1.87512 10.8228 1.87512 10.8228L1.93349 15.1266C1.93349 16.8988 3.35086 18.3334 5.10174 18.3334H15.1401C16.891 18.3334 18.3083 16.8988 18.3083 15.1266L18.375 10.8228C18.375 10.8228 18.375 10.7216 18.3 10.6794C18.2583 10.6541 18.2083 10.6625 18.1749 10.6794ZM10.7462 14.2152C10.7462 14.5697 10.4711 14.8481 10.1209 14.8481C9.77907 14.8481 9.4956 14.5697 9.4956 14.2152V13.1266C9.4956 12.7806 9.77907 12.4937 10.1209 12.4937C10.4711 12.4937 10.7462 12.7806 10.7462 13.1266V14.2152Z" fill="#D4D6DD"/>
</svg>
`;

const _debtsOn = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04538 2.9325C8.48676 2.9325 8.01152 3.32069 7.87812 3.84389H12.3637C12.2303 3.32069 11.7551 2.9325 11.1965 2.9325H9.04538ZM13.631 3.84389H15.2818C17.0327 3.84389 18.4584 5.28692 18.4584 7.05906C18.4584 7.05906 18.4084 7.80927 18.3917 8.85399C18.39 8.93669 18.35 9.0177 18.2842 9.06665C17.8831 9.36285 17.5163 9.60757 17.4829 9.62445C16.0989 10.5527 14.4906 11.2059 12.7772 11.5308C12.6655 11.5527 12.5555 11.4945 12.4988 11.3949C12.0185 10.5628 11.1214 10.0211 10.1209 10.0211C9.12708 10.0211 8.22163 10.5569 7.72722 11.3898C7.66969 11.4877 7.5613 11.5443 7.45041 11.5232C5.75123 11.1974 4.14292 10.5451 2.76724 9.63289L1.96684 9.07593C1.90014 9.03374 1.85845 8.95779 1.85845 8.8734C1.83344 8.44302 1.79175 7.05906 1.79175 7.05906C1.79175 5.28692 3.21746 3.84389 4.96834 3.84389H6.61082C6.76924 2.62027 7.79475 1.66669 9.04538 1.66669H11.1965C12.4471 1.66669 13.4726 2.62027 13.631 3.84389ZM18.1749 10.6794L18.1416 10.6963C16.4574 11.8271 14.4314 12.5781 12.3053 12.8903C12.0052 12.9325 11.705 12.7384 11.6217 12.4346C11.4382 11.7427 10.8463 11.287 10.1376 11.287H10.1292H10.1126C9.40389 11.287 8.81192 11.7427 8.6285 12.4346C8.54512 12.7384 8.24497 12.9325 7.94482 12.8903C5.81876 12.5781 3.79275 11.8271 2.10857 10.6963C2.10024 10.6878 2.01686 10.6372 1.95016 10.6794C1.87512 10.7216 1.87512 10.8228 1.87512 10.8228L1.93349 15.1266C1.93349 16.8988 3.35086 18.3334 5.10174 18.3334H15.1401C16.891 18.3334 18.3083 16.8988 18.3083 15.1266L18.375 10.8228C18.375 10.8228 18.375 10.7216 18.3 10.6794C18.2583 10.6541 18.2083 10.6625 18.1749 10.6794ZM10.7462 14.2152C10.7462 14.5697 10.4711 14.8481 10.1209 14.8481C9.77907 14.8481 9.4956 14.5697 9.4956 14.2152V13.1266C9.4956 12.7806 9.77907 12.4937 10.1209 12.4937C10.4711 12.4937 10.7462 12.7806 10.7462 13.1266V14.2152Z" fill="#006FFD"/>
</svg>
`;

const _teachersOff = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7187 6.46868C12.7187 8.67181 10.9159 10.4374 8.66619 10.4374C6.41733 10.4374 4.61367 8.67181 4.61367 6.46868C4.61367 4.26554 6.41733 2.5 8.66619 2.5C10.9159 2.5 12.7187 4.26554 12.7187 6.46868ZM2.54175 14.9311C2.54175 12.8917 5.36302 12.3814 8.66619 12.3814C11.9873 12.3814 14.7906 12.9093 14.7906 14.9503C14.7906 16.9897 11.9694 17.5 8.66619 17.5C5.34508 17.5 2.54175 16.9722 2.54175 14.9311ZM14.3529 6.54062C14.3529 7.66255 14.0088 8.70942 13.4054 9.57902C13.3427 9.66845 13.3981 9.78903 13.5074 9.80819C13.659 9.83295 13.8148 9.84812 13.9738 9.85131C15.5556 9.89204 16.9752 8.89468 17.3675 7.39265C17.9488 5.16396 16.243 3.16286 14.07 3.16286C13.8343 3.16286 13.6085 3.18681 13.3883 3.23073C13.3581 3.23712 13.3255 3.25149 13.3092 3.27705C13.288 3.30979 13.3035 3.35211 13.3247 3.38006C13.9778 4.2768 14.3529 5.36839 14.3529 6.54062ZM16.9728 11.4186C18.0361 11.6222 18.7349 12.0366 19.0243 12.6411C19.2698 13.1362 19.2698 13.7112 19.0243 14.2062C18.5816 15.1421 17.153 15.4432 16.5977 15.5206C16.4827 15.5366 16.3906 15.4408 16.4028 15.3274C16.6866 12.7338 14.4304 11.504 13.8466 11.2213C13.8221 11.2078 13.8164 11.1886 13.8188 11.1758C13.8205 11.1678 13.8311 11.1551 13.8498 11.1527C15.1129 11.1287 16.4713 11.2988 16.9728 11.4186Z" fill="#D4D6DD"/>
</svg>
`;

const _teachersOn = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7187 6.46868C12.7187 8.67181 10.9159 10.4374 8.66619 10.4374C6.41733 10.4374 4.61367 8.67181 4.61367 6.46868C4.61367 4.26554 6.41733 2.5 8.66619 2.5C10.9159 2.5 12.7187 4.26554 12.7187 6.46868ZM2.54175 14.9311C2.54175 12.8917 5.36302 12.3814 8.66619 12.3814C11.9873 12.3814 14.7906 12.9093 14.7906 14.9503C14.7906 16.9897 11.9694 17.5 8.66619 17.5C5.34508 17.5 2.54175 16.9722 2.54175 14.9311ZM14.3529 6.54062C14.3529 7.66255 14.0088 8.70942 13.4054 9.57902C13.3427 9.66845 13.3981 9.78903 13.5074 9.80819C13.659 9.83295 13.8148 9.84812 13.9738 9.85131C15.5556 9.89204 16.9752 8.89468 17.3675 7.39265C17.9488 5.16396 16.243 3.16286 14.07 3.16286C13.8343 3.16286 13.6085 3.18681 13.3883 3.23073C13.3581 3.23712 13.3255 3.25149 13.3092 3.27705C13.288 3.30979 13.3035 3.35211 13.3247 3.38006C13.9778 4.2768 14.3529 5.36839 14.3529 6.54062ZM16.9728 11.4186C18.0361 11.6222 18.7349 12.0366 19.0243 12.6411C19.2698 13.1362 19.2698 13.7112 19.0243 14.2062C18.5816 15.1421 17.153 15.4432 16.5977 15.5206C16.4827 15.5366 16.3906 15.4408 16.4028 15.3274C16.6866 12.7338 14.4304 11.504 13.8466 11.2213C13.8221 11.2078 13.8164 11.1886 13.8188 11.1758C13.8205 11.1678 13.8311 11.1551 13.8498 11.1527C15.1129 11.1287 16.4713 11.2988 16.9728 11.4186Z" fill="#006FFD"/>
</svg>
`;

const _profileOff = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 15.4545C3 12.9944 4.99437 11 7.45455 11H12.5455C15.0056 11 17 12.9944 17 15.4545C17 16.8604 15.8604 18 14.4545 18H5.54545C4.13964 18 3 16.8604 3 15.4545Z" fill="#D3D6DD"/>
<path d="M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z" fill="#D3D6DD"/>
</svg>
`;

const _profileOn = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 15.4545C3 12.9944 4.99437 11 7.45455 11H12.5455C15.0056 11 17 12.9944 17 15.4545C17 16.8604 15.8604 18 14.4545 18H5.54545C4.13964 18 3 16.8604 3 15.4545Z" fill="#316DFD"/>
<path d="M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z" fill="#316DFD"/>
</svg>
`;