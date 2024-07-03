import { Tabs } from 'expo-router';
import React, { Component } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import { ListaItemType } from '@/utils/ListaItemType';
import { db } from '@/db';

export default function TabLayout() {
  const colorScheme = useColorScheme();



  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          height: 60
        },
        tabBarItemStyle: {
          paddingBottom: 10
        }
          
      }}>
        <Tabs.Screen 
        name="ficha"

        options={
          {
          title: 'Minha Ficha',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
