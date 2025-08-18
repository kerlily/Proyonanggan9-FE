'use client'

import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import {
  fadeInDown,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn
} from '../utils/animations'

interface FormData {
  name: string
  email: string
  message: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
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
    <div className="container max-w-7xl mx-auto py-12 pt-20">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        {...fadeInDown}
        transition={{ ...fadeInDown.transition, delay: 0.2 }}
      >
        Hubungi Kami
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div className="space-y-8" {...fadeInLeft}>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Informasi Kontak</h2>
            <p className="text-secondary">
              Silakan hubungi kami melalui informasi berikut atau kirimkan pesan
              langsung melalui formulir.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <FaEnvelope className="h-6 w-6 text-primary" />,
                title: 'Email',
                value: (
                  <a
                    href="mailto:sdnproyonanggan09@gmail.com"
                    className="text-secondary hover:text-primary"
                  >
                    sdnproyonanggan09@gmail.com
                  </a>
                )
              },
              {
                icon: <FaPhone className="h-6 w-6 text-primary" />,
                title: 'Telepon',
                value: (
                  <a
                    href="tel:+62285392825"
                    className="text-secondary hover:text-primary"
                  >
                    (0285) 392825
                  </a>
                )
              },
              {
                icon: <FaMapMarkerAlt className="h-6 w-6 text-primary" />,
                title: 'Alamat',
                value: (
                  <p className="text-secondary">
                    Jl. Ki Mangun Sarkoro No. 4,<br />
                    Kel. Proyonanggan Selatan,<br />
                    Kab. Batang, Jawa Tengah
                  </p>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 hover:translate-x-2 transition-transform"
                {...fadeInUp}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {item.icon}
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
          {...fadeInRight}
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
      </div>
    </div>
  )
}
