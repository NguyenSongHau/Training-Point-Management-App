import { AntDesign, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { ScrollView, Text, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { rolesName } from '../../../Configs/Constants';
import HomeStyle from '../../../Screens/Home/Style';
import GlobalStyle, { screenWidth } from '../../../Styles/Style';
import Theme from '../../../Styles/Theme';
import Loading from '../../Common/Loading';

const BulletinSummary = ({ bulletin, ...props }) => {
   if (props?.loading) return <Loading />;

   return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
         <View style={{ ...HomeStyle.DetailsContainer, ...GlobalStyle.Container, ...props?.style }}>
            <View style={{ marginTop: 12 }}>
               <Text style={{ fontFamily: Theme.Bold, fontSize: 20 }}>Mô tả bản tin</Text>
               <RenderHTML
                  contentWidth={screenWidth}
                  source={{ html: bulletin.description }}
                  baseStyle={HomeStyle.DetailsDescription}
               />
            </View>

            <View style={{ ...HomeStyle.DetailsWrap, marginTop: 12 }}>
               <View style={{ ...HomeStyle.DetailsItem, width: '100%' }}>
                  <View style={HomeStyle.DetailsIcon}>
                     <Ionicons name="person" size={32} />
                  </View>
                  <View style={HomeStyle.Details}>
                     <Text style={{ ...HomeStyle.DetailsText, fontFamily: Theme.Bold }}>
                        Người tạo: <Text style={{ fontFamily: Theme.Regular }}>{bulletin.created_by.full_name}</Text>
                     </Text>
                     <Text style={{ ...HomeStyle.DetailsValue, ...HomeStyle.DetailsCreatedBy }}>
                        {rolesName[bulletin.created_by.role]}
                     </Text>
                  </View>
               </View>
            </View>

            <View style={HomeStyle.DetailsWrap}>
               <View style={HomeStyle.DetailsItem}>
                  <View style={HomeStyle.DetailsIcon}>
                     <AntDesign name="clockcircle" size={32} />
                  </View>
                  <View style={HomeStyle.Details}>
                     <Text style={HomeStyle.DetailsText}>Ngày tạo</Text>
                     <Text style={HomeStyle.DetailsValue}>{moment(bulletin.created_date).format('DD/MM/YYYY')}</Text>
                  </View>
               </View>
               <View style={HomeStyle.DetailsItem}>
                  <View style={HomeStyle.DetailsIcon}>
                     <AntDesign name="clockcircle" size={32} />
                  </View>
                  <View style={HomeStyle.Details}>
                     <Text style={HomeStyle.DetailsText}>Cập nhật</Text>
                     <Text style={HomeStyle.DetailsValue}>{moment(bulletin.updated_date).format('DD/MM/YYYY')}</Text>
                  </View>
               </View>
            </View>
         </View>
      </ScrollView>
   );
};

export default BulletinSummary;
