import domtoimage from 'dom-to-image';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderRankings = ({ rankings, source, destination }) => {
    const current = [...rankings[source.droppableId].teams];
    const next = [...rankings[destination.droppableId].teams];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);

        const result = {
            ...rankings,
            [source.droppableId]: {
                ...rankings[source.droppableId],
                teams: reordered,
            },
        };

        return {
            rankings: result,
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
        ...rankings,
        [source.droppableId]: {
            ...rankings[source.droppableId],
            teams: current,
        },
        [destination.droppableId]: {
            ...rankings[destination.droppableId],
            teams: next,
        },
    };

    return {
        rankings: result,
    };
};

const configExportImage = ({ offsetHeight }, maxTeams) => ({
    style: {
        background: '#0e0e0e',
    },
    width: maxTeams * 110 + 200 + 200,
    height: offsetHeight,
});

const countMaxTeamsInRows = ({ rankings }) => {
    const teams = Object.keys(rankings).map(e => rankings[e].teams.length);
    return Math.max(...teams);
};

export const getImageByNode = async (node, { rankings }, type) => {
    const config = configExportImage(node, countMaxTeamsInRows({ rankings }));
    if (type === 'blob') {
        return await domtoimage.toBlob(node, config);
    }
    return await domtoimage.toPng(node, config);
};

export const openTwitterUrl = twitterUrl => {
    const width = 575;
    const height = 400;
    const left = (window.outerWidth - width) / 2;
    const top = (window.outerHeight - height) / 2;
    const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    window.open(twitterUrl, 'twitter', opts);
};
