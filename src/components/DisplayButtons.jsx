import * as React from 'react';
import SaveButton from './buttonComponents/SaveButton';
import LoadButton from './buttonComponents/LoadButton';
import DeleteGraph from './buttonComponents/DeleteGraph';
import ViewGraphButton from './buttonComponents/ViewGraphButton';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';

export default function DisplayButtons({ graph, updateGraph, changeOption }) {
    const [onOff, setOnOff] = React.useState(false);
    const [hierarchy, setHierarchy] = React.useState("GRAPH");
    const [graphName, updateGraphName] = React.useState("Graph");

    function updateHierarchie() {
        if (onOff) {
            setHierarchy("GRAPH");
            setOnOff(false);
            changeOption({
                height: "900px",
                layout: {
                    hierarchical: false,
                },
            });
        } else {
            setHierarchy("TREE");
            setOnOff(true);
            changeOption({
                height: "900px",
                layout: {
                    hierarchical: true,
                },
            });
        }
    }

    return (
        <div className='buttonsDisplay'>
            <h2 className='titles'>Graph Name</h2>
            <div className='saveclass'>
                <input
                    className='buttons'
                    onChange={(e) => updateGraphName(e.target.value)}
                    type='text'
                    id='graphName'
                    name='graphName'
                />

                <SaveButton graph={graph} graphName={graphName} />

            </div>

            <div>
                <LoadButton updateGraph={updateGraph} graphName={graphName} />
                <DeleteGraph graphName={graphName} />
                <ViewGraphButton />
            </div><br />

            <div className='saveclass'>
                <button className='buttons' onClick={() => updateGraph({ nodes: [], edges: [] })}>
                    CLEAR
                </button>

                <button className='buttons' onClick={updateHierarchie}>
                    CURRENT DISPLAY : {hierarchy}
                </button>
                {/*<Button variant='contained' onClick={() => navigate('/SignIn')}>EXIT</Button>*/}
                <Link href='/SignIn' variant="body2">
                    <Button variant={"contained"}>
                        EXIT
                    </Button>
                </Link>
            </div>
        </div>
    );
}
