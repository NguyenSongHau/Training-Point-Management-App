import { createStackNavigator } from '@react-navigation/stack';
import CreateActivityView from '../../Components/Profile/ActivitySettings/CreateActivityView';
import EditActivityView from '../../Components/Profile/ActivitySettings/EditActivityView';
import ReportActivityForm from '../../Components/Profile/TrainingPoints/ReportActivityForm';
import ActivitiesOfStudent from '../../Screens/Profile/ActivitesOfStudent';
import ActivitySettings from '../../Screens/Profile/ActivitySettings';
import CreateAssistantAccount from '../../Screens/Profile/CreateAssistantAccount';
import EditProfile from '../../Screens/Profile/EditProfile';
import MissingReportDetails from '../../Screens/Profile/MissingReportDetails';
import MissingReportsOfStudent from '../../Screens/Profile/MissingReportsOfStudent';
import SecuritySettings from '../../Screens/Profile/SecuritySettings';
import TrainingPoints from '../../Screens/Profile/TrainingPoints';
import Theme from '../../Styles/Theme';

const Stack = createStackNavigator();

const ProfileStack = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerStyle: { backgroundColor: Theme.PrimaryColor },
            headerTintColor: 'white',
         }}
      >
         <Stack.Group>
            <Stack.Screen
               name="EditProfile"
               component={EditProfile}
               options={({ route }) => ({ title: route?.params?.fullName ?? 'Trang cá nhân' })}
            />
            <Stack.Screen
               name="ActivitiesOfStudent"
               component={ActivitiesOfStudent}
               options={{ title: 'Hoạt động của sinh viên' }}
            />
            <Stack.Screen
               name="ActivitySettings"
               component={ActivitySettings}
               options={{ title: 'Quản lý hoạt động' }}
            />
            <Stack.Screen
               name="MissingReportsOfStudent"
               component={MissingReportsOfStudent}
               options={{ title: 'Báo thiếu sinh viên' }}
            />
            <Stack.Screen
               name="MissingReportsOfStudentDetail"
               component={MissingReportDetails}
               options={{ title: 'Chi tiết báo thiếu' }}
            />
            <Stack.Screen
               name="CreateAssistantAccount"
               component={CreateAssistantAccount}
               options={{ title: 'Đăng ký tài khoản' }}
            />
            <Stack.Screen name="SecuritySettings" component={SecuritySettings} options={{ title: 'Cài đặt bảo mật' }} />
         </Stack.Group>

         <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TrainingPoint" component={TrainingPoints} />
         </Stack.Group>

         <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
               name="ReportActivityForm"
               component={ReportActivityForm}
               options={{ title: 'Báo thiếu hoạt động' }}
            />
            <Stack.Screen
               name="CreateActivityForm"
               component={CreateActivityView}
               options={{ title: 'Tạo hoạt động' }}
            />
            <Stack.Screen
               name="EditActivityForm"
               component={EditActivityView}
               options={{ title: 'Chỉnh sửa hoạt động' }}
            />
         </Stack.Group>
      </Stack.Navigator>
   );
};

export default ProfileStack;
