import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Theme from '../../common/context/Theme';
import '../css/NoteList.css';

const NotePreview = (props) => {

    const {object, indexKey} = props;

    const history = useHistory();

    const onClick = () => {
        history.push("/note/" + object.id);
    }

    const {theme, setTheme} = useContext(Theme);

    return(
        <li className={theme ? "notePreview-dark" :  "notePreview"} onClick={onClick} key={indexKey}>  
            <p><strong>{object.title.length > 22 ? object.title.substring(0, 22) + " ...": object.title.substring(0, 22)}</strong></p>
            <div/>
            <textarea className='textarea-none' rows={7} maxLength="130" value={object.content.length > 127 ? object.content.substring(0, 127) + " ...": object.content.substring(0, 127)} readOnly={true}></textarea>
        </li>
    );

}

export default NotePreview;