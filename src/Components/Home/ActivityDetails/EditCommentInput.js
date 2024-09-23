import { useRef, useState } from 'react';
import {
   Alert,
   Image,
   Modal,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
} from 'react-native';
import { Portal } from 'react-native-paper';
import { RichEditor } from 'react-native-pell-rich-editor';
import { authAPI, endPoints } from '../../../Configs/APIs';
import { statusCode } from '../../../Configs/Constants';
import { useAccountDispatch } from '../../../Store/Contexts/AccountContext';
import GlobalStyle from '../../../Styles/Style';
import Theme from '../../../Styles/Theme';
import { getTokens, refreshAccessToken } from '../../../Utils/Utilities';

const EditCommentInput = (props) => {
   const dispatch = useAccountDispatch();

   const refEditorEditComment = useRef(RichEditor);

   const [editComment, setEditComment] = useState('');

   const handleEditComment = async () => {
      if (!editComment) return;

      let form = new FormData();
      form.append('content', editComment);

      props?.setModalVisible(true);
      props?.setModalSettingsVisible(false);
      props?.setModalEditCommentVisible(false);
      const { accessToken, refreshToken } = await getTokens();
      try {
         let response = await authAPI(accessToken).put(endPoints['comment-detail'](props?.selectedComment.id), form);

         if (response.status === statusCode.HTTP_200_OK) {
            const index = props?.comments.findIndex((comment) => comment.id === props?.selectedComment.id);
            props?.setComments([
               ...props?.comments.slice(0, index),
               response.data,
               ...props?.comments.slice(index + 1),
            ]);
         }
      } catch (error) {
         if (
            error.response &&
            (error.response.status === statusCode.HTTP_401_UNAUTHORIZED ||
               error.response.status === statusCode.HTTP_403_FORBIDDEN)
         ) {
            const newAccessToken = await refreshAccessToken(refreshToken, dispatch);
            if (newAccessToken) {
               handleEditComment();
            }
         } else {
            console.error('Edit comment:', error);
            Alert.alert('Thông báo', 'Hệ thống đang bận, vui lòng thử lại sau!');
         }
      } finally {
         props?.setModalVisible(false);
      }
   };

   const handleOnPressWithoutFeedback = () => {
      if (refEditorEditComment?.current?.isKeyboardOpen) {
         refEditorEditComment?.current?.dismissKeyboard();
      }
   };

   return (
      <Portal>
         <Modal
            visible={props?.modalEditCommentVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => props?.setModalEditCommentVisible(false)}
         >
            <View style={{ flex: 1 }}>
               <View
                  style={{ ...GlobalStyle.ModalContainer, backgroundColor: '#273238' }}
                  onTouchStart={handleOnPressWithoutFeedback}
               >
                  <TouchableWithoutFeedback>
                     <View style={EditCommentInputStyle.EditCommentInput}>
                        <View style={{ marginRight: 12, alignSelf: 'flex-start' }}>
                           <Image
                              source={{ uri: props?.selectedComment?.account?.avatar }}
                              style={EditCommentInputStyle.Avatar}
                           />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                           <RichEditor
                              ref={refEditorEditComment}
                              onChange={setEditComment}
                              initialContentHTML={props?.selectedComment.content}
                              placeholder="Nhập bình luận của bạn..."
                              showsVerticalScrollIndicator={false}
                              showsHorizontalScrollIndicator={false}
                              style={{ borderRadius: 16, overflow: 'hidden' }}
                              editorStyle={{ backgroundColor: '#d5deef', placeholderColor: 'gray' }}
                           />
                        </ScrollView>
                     </View>
                  </TouchableWithoutFeedback>
                  <View style={EditCommentInputStyle.EditButtonsContainer}>
                     <TouchableOpacity
                        style={EditCommentInputStyle.EditButton}
                        onPress={() => props?.setModalEditCommentVisible(false)}
                     >
                        <Text style={EditCommentInputStyle.EditButtonText}>Hủy</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={EditCommentInputStyle.EditButton} onPress={handleEditComment}>
                        <Text style={EditCommentInputStyle.EditButtonText}>Cập nhập</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
      </Portal>
   );
};

const EditCommentInputStyle = StyleSheet.create({
   EditCommentInput: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
      marginHorizontal: 12,
   },
   Avatar: {
      width: 48,
      height: 48,
      borderRadius: 30,
      backgroundColor: Theme.SecondaryColor,
   },
   EditButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 20,
      marginHorizontal: 12,
   },
   EditButton: {
      backgroundColor: 'grey',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
   },
   EditButtonText: {
      color: 'white',
      fontFamily: Theme.Bold,
   },
});

export default EditCommentInput;
