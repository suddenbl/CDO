import { useEffect } from 'react';
import { Button, Text, List } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { setSubjectList } from '../../store/slices/rectorSlice';
import axios from 'axios';
import styles from './SubjectList.module.scss';

const SubjectList = () => {
  const subjectList = useSelector((state) => state.rector.subjectList);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchSubj = async () => {
        const subjects = await axios.get('http://localhost:5240/Subject');
        const subjectsList = subjects.data.map((subject) => ({
          value: subject.subjectID.toString(),
          label: subject.subjectName,
        }));
        dispatch(setSubjectList(subjectsList));
      };

      fetchSubj();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteSubject = async (subjectID) => {
    try {
      const response = await axios.delete(`http://localhost:5240/Subject/${subjectID}`);
      console.log('Subject deleted successfully:', response.data);
      const updatedSubjects = await axios.get('http://localhost:5240/Subject');
      setSubjectList(updatedSubjects.data);
    } catch (error) {
      console.log('Error while deleting subject:', error);
    }
  };

  //   console.log('subjectList:', subjectList);

  return (
    <List type="ordered" className={styles.subjectList}>
      {subjectList.map((subject) => (
        <List.Item key={subject.label}>
          <Text size="md" className={styles.subjectName}>
            {subject.label}
          </Text>
          <Button onClick={() => deleteSubject(subject.value)}>Удалить</Button>
        </List.Item>
      ))}
    </List>
  );
};

export default SubjectList;
