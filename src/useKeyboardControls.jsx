// src/useKeyboardControls.js

import { useEffect, useSyncExternalStore } from 'react';

// 单例：存储键盘状态的外部变量
const keysState = { 
    KeyW: false, 
    KeyA: false, 
    KeyS: false, 
    KeyD: false, 
    ArrowUp: false,    
    ArrowDown: false,  
    ArrowLeft: false,  
    ArrowRight: false,
    Space: false
};

// 单例：事件监听器是否已绑定
let isListenerAttached = false;

// 使用 subscribe 模式来通知组件更新
const subscribers = new Set();

// 单例：触发所有订阅者更新的函数
function notifySubscribers() {
    subscribers.forEach(callback => callback());
}

function attachListener() {
    if (isListenerAttached) return;
    
    const handleKeyDown = (e) => {
        if (Object.prototype.hasOwnProperty.call(keysState, e.code)) {
            keysState[e.code] = true;
            notifySubscribers();
        }
    };

    const handleKeyUp = (e) => {
        if (Object.prototype.hasOwnProperty.call(keysState, e.code)) {
            keysState[e.code] = false;
            notifySubscribers();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    isListenerAttached = true;
}

// 订阅函数
function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
}

// 获取当前快照
function getSnapshot() {
    return keysState;
}

export function useKeyboardControls() {
    // 使用 useSyncExternalStore 确保外部状态同步
    // 这是 React 18 推荐的方式处理外部状态
    const keys = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot // 服务端渲染时的默认值
    );

    useEffect(() => {
        attachListener();
    }, []);

    return keys;
}
