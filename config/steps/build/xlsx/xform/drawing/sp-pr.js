export const tag = 'xdr:spPr';
export const c = [
    {
        tag: 'a:xfrm',
        c: [
            { tag: 'a:off', $: { x: '0', y: '0' } },
            { tag: 'a:ext', $: { cx: '0', cy: '0' } },
        ],
    },
    {
        tag: 'a:prstGeom',
        $: { prst: 'rect' },
        c: [{ tag: 'a:avLst' }],
    },
];
export default {
    tag,
    c
};
