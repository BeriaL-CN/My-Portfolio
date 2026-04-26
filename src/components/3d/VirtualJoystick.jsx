// src/components/3d/VirtualJoystick.jsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import './VirtualJoystick.css';

const JOYSTICK_MAX_RADIUS = 60; // 摇杆最大移动半径
const JOYSTICK_BASE_SIZE = 80;  // 摇杆底座大小
const JOYSTICK_STICK_SIZE = 50; // 摇杆摇柄大小

export function VirtualJoystick({ onMove }) {
    const joystickRef = useRef(null);
    const stickRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
    
    // 计算摇杆位置的核心函数（必须在回调前定义）
    const handleMoveInternal = useCallback((clientX, clientY, centerX, centerY) => {
        let deltaX = clientX - centerX;
        let deltaY = clientY - centerY;
        
        // 计算距离
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // 限制摇杆移动范围
        if (distance > JOYSTICK_MAX_RADIUS) {
            const ratio = JOYSTICK_MAX_RADIUS / distance;
            deltaX *= ratio;
            deltaY *= ratio;
        }
        
        // 更新摇柄位置
        if (stickRef.current) {
            stickRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
        
        setStickPosition({ x: deltaX, y: deltaY });
        
        // 发送归一化的移动向量 (-1 到 1)
        if (onMove) {
            onMove({
                x: deltaX / JOYSTICK_MAX_RADIUS,
                y: deltaY / JOYSTICK_MAX_RADIUS
            });
        }
    }, [onMove]);
    
    // 触摸事件处理器
    const onTouchStart = useCallback((e) => {
        if (!joystickRef.current) return;
        
        const touch = e.touches[0];
        const rect = joystickRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        handleMoveInternal(touch.clientX, touch.clientY, centerX, centerY);
        setIsDragging(true);
    }, [handleMoveInternal]);
    
    const onTouchMove = useCallback((e) => {
        if (!isDragging || !joystickRef.current) return;
        
        const touch = e.touches[0];
        const rect = joystickRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        handleMoveInternal(touch.clientX, touch.clientY, centerX, centerY);
    }, [isDragging, handleMoveInternal]);
    
    const onTouchEnd = useCallback(() => {
        setIsDragging(false);
        setStickPosition({ x: 0, y: 0 });
        
        // 重置摇杆位置
        if (stickRef.current) {
            stickRef.current.style.transform = `translate(0px, 0px)`;
        }
        
        // 发送停止信号
        if (onMove) {
            onMove({ x: 0, y: 0 });
        }
    }, [onMove]);
    
    // 鼠标事件处理器（用于测试）
    const onMouseDown = useCallback((e) => {
        if (!joystickRef.current) return;
        
        const rect = joystickRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        handleMoveInternal(e.clientX, e.clientY, centerX, centerY);
        setIsDragging(true);
    }, [handleMoveInternal]);
    
    const onMouseMove = useCallback((e) => {
        if (!isDragging || !joystickRef.current) return;
        
        const rect = joystickRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        handleMoveInternal(e.clientX, e.clientY, centerX, centerY);
    }, [isDragging, handleMoveInternal]);
    
    const onMouseUp = useCallback(() => {
        setIsDragging(false);
        setStickPosition({ x: 0, y: 0 });
        
        // 重置摇杆位置
        if (stickRef.current) {
            stickRef.current.style.transform = `translate(0px, 0px)`;
        }
        
        // 发送停止信号
        if (onMove) {
            onMove({ x: 0, y: 0 });
        }
    }, [onMove]);
    
    const onMouseLeave = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            setStickPosition({ x: 0, y: 0 });
            
            // 重置摇杆位置
            if (stickRef.current) {
                stickRef.current.style.transform = `translate(0px, 0px)`;
            }
            
            // 发送停止信号
            if (onMove) {
                onMove({ x: 0, y: 0 });
            }
        }
    }, [isDragging, onMove]);
    
    // 使用 useEffect 添加和移除事件监听器
    useEffect(() => {
        const joystickElement = joystickRef.current;
        if (!joystickElement) return;
        
        // 添加事件监听器
        joystickElement.addEventListener('touchstart', onTouchStart, { passive: false });
        joystickElement.addEventListener('touchmove', onTouchMove, { passive: false });
        joystickElement.addEventListener('touchend', onTouchEnd, { passive: false });
        joystickElement.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        joystickElement.addEventListener('mouseleave', onMouseLeave);
        
        // 清理函数
        return () => {
            joystickElement.removeEventListener('touchstart', onTouchStart);
            joystickElement.removeEventListener('touchmove', onTouchMove);
            joystickElement.removeEventListener('touchend', onTouchEnd);
            joystickElement.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            joystickElement.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave]);
    
    return (
        <div 
            className="virtual-joystick" 
            ref={joystickRef}
        >
            {/* 摇杆底座 */}
            <div className="joystick-base">
                {/* 摇杆摇柄 */}
                <div 
                    className="joystick-stick" 
                    ref={stickRef}
                    style={{
                        transform: `translate(${stickPosition.x}px, ${stickPosition.y}px)`
                    }}
                >
                    {/* 摇柄内部装饰 */}
                    <div className="joystick-stick-inner"></div>
                </div>
            </div>
        </div>
    );
}

export default VirtualJoystick;
