// src/app/contact/ContactForm.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, scaleIn } from '../utils/animations'

interface FormData {
  name: string
  email: string
  message: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ✅ Client Component - hanya bagian yang butuh interaktivitas
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://formspree.io/f/xblyepda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Gagal mengirim pesan')

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      console.error('Error sending message:', error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: 'Nama', type: 'text', id: 'name', value: formData.name },
          { label: 'Email', type: 'email', id: 'email', value: formData.email }
        ].map((field, i) => (
          <motion.div key={i} {...fadeInUp} transition={{ delay: 0.2 + i * 0.1 }}>
            <label htmlFor={field.id} className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={field.value}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </motion.div>
        ))}

        <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn btn-primary hover:scale-[1.02] active:scale-95 transition-transform"
          {...scaleIn}
          transition={{ delay: 0.5 }}
        >
          {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
        </motion.button>

        {status === 'success' && (
          <p className="text-green-500 text-center mt-2">
            Pesan berhasil dikirim!
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-center mt-2">
            Gagal mengirim pesan. Silakan coba lagi.
          </p>
        )}
      </form>
    </motion.div>
  )
}