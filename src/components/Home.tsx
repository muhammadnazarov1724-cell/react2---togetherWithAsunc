import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRedux, getUsersRedux } from '../store/dataSlice'
import { CircularProgress } from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai/react'
import { dataJ, deleteAtom, getUsersAtom } from '../store/jotai'
import { useData } from '../store/zustand'

export default function Home() {

    let {dataR,loading} = useSelector((state) => state.data)
    let dispatch = useDispatch()

    let dataJ = useAtomValue(getUsersAtom)
    let deleteUser = useSetAtom(deleteAtom)

    let {dataZ,get,deleteZustand} = useData((state) => state)

    let mainData=dataZ.map(el=>{
        let userr=dataR.find(elr=>elr.id==el.id)
        let userj=dataJ.find(elj=>elj.id==el.id)

        return {...el,...userr,...userj}
    })


    useEffect(()=> {
        dispatch(getUsersRedux()),
        get()
        },[])

  return (
    <>
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px', gap: '30px' }}>
    {loading ? <CircularProgress /> : mainData?.map((user) => {
        return (
            <div 
                key={user.id} 
                style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '16px',
                    padding: '24px',
                    width: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
            >
                <img 
                    style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px' }} 
                    src={user.avatar} 
                    alt="" 
                />
                <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>{user.name}</h2>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 'normal', color: '#666666' }}>Age: {user.age}</h3>
                <h4 style={{ 
                    margin: '0 0 20px 0', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '13px', 
                    fontWeight: 'bold',
                    backgroundColor: user.status ? '#e8f5e9' : '#ffebee',
                    color: user.status ? '#2e7d32' : '#c62828'
                }}>
                    {user.status ? 'Active' : 'Inactive'}
                </h4>
                <button 
                    style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#d32f2f',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                    onClick={() => {
                        dispatch(deleteRedux(user.id)); 
                        deleteZustand(user.id);
                        deleteUser(user.id);
                    }}
                >
                    Delete
                </button>
            </div>
        )
    })}
</div>
    </>
  )
}
