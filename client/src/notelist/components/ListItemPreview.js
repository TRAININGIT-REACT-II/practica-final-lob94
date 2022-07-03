import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Theme from '../../common/context/Theme';
import '../css/NoteList.css';

const ListItemPreview = (props) => {

    const {object, indexKey} = props;

    const history = useHistory();

    const onClick = () => {
        history.push("/note/" + object.id);
    }

    const {theme, setTheme} = useContext(Theme);

    return (
        <tr className={theme ? "listItemDark": "listItem"} onClick={onClick} key={indexKey}>
            <td className='listItem-Text'>
                {object.title}
            </td>
            <td className='listItem-Text'>
                {object.author}
            </td>
            <td className='listItem-Text'>
                {object.createdAt}
            </td>
            <td className='listItem-Text'>
                {object.updatedAt}
            </td>
        </tr>
    );
}

export default ListItemPreview