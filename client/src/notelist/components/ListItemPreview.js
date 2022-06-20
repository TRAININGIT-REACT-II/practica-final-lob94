import { useHistory } from 'react-router-dom';
import '../css/NoteList.css';

const ListItemPreview = ({object}) => {

    const history = useHistory();

    const onClick = () => {
        history.push("/nota");
    }

    return (
        <tr className="listItem" onClick={onClick}>
            <td className='listItem-Text'>
                {object.title}
            </td>
            <td className='listItem-Text'>
                {object.author}
            </td>
            <td className='listItem-Text'>
                {object.creationDate}
            </td>
            <td className='listItem-Text'>
                {object.updateDate}
            </td>
        </tr>
    );
}

export default ListItemPreview