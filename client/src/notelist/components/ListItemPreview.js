import { useHistory } from 'react-router-dom';
import '../css/NoteList.css';

const ListItemPreview = (props) => {

    const {object, indexKey} = props;

    const history = useHistory();

    const onClick = () => {
        history.push("/note/" + object.id);
    }

    return (
        <tr className="listItem" onClick={onClick} key={indexKey}>
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