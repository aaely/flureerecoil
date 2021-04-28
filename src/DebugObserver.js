import React, { useEffect } from 'react'
import { useRecoilSnapshot } from 'recoil'

export function DebugObserver(): React.Node {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
      console.debug('The following atoms were modified:');
      for (const node of snapshot.getNodes({modified: true})) {
        console.debug(node.key, snapshot.getLoadable(node));
      }
    }, [snapshot]);
  
    return null;
  }